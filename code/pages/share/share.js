const { getTestById } = require('../../data/tests.js');
const { getPersonalityImageFileID } = require('../../data/personalityImages.js');

const W = 750, H = 1334;

function getCloudImgKey(testId, resultCode) {
  return getPersonalityImageFileID(testId, resultCode);
}

// 下载云存储图片并返回本地临时路径，失败时返回 null
function fetchCloudImg(fileID) {
  return new Promise((resolve) => {
    if (!fileID || !wx.cloud) { resolve(null); return; }
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: (res) => {
        const url = res.fileList[0] && res.fileList[0].tempFileURL;
        if (!url) { resolve(null); return; }
        wx.getImageInfo({
          src: url,
          success: (info) => resolve(info.path),
          fail: () => resolve(null),
        });
      },
      fail: () => resolve(null),
    });
  });
}

Page({
  data: { imgUrl: '' },

  onLoad(opt) {
    const app = getApp();
    const test = getTestById(opt.id);
    if (!test) { wx.navigateBack(); return; }
    this.test = test;
    this.result = app.globalData.currentResult;
    wx.nextTick(() => this.drawPoster());
  },

  async drawPoster() {
    try {
      // 尝试加载云端个性化图片
      const code = this.getCode();
      const cloudImgKey = getCloudImgKey(this.test.id, code);
      const bgImgPath = await fetchCloudImg(cloudImgKey);

      const query = wx.createSelectorQuery();
      query.select('#poster').fields({ node: true, size: true }).exec(async (res) => {
        if (!res[0]) return;
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio || 2;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);

        if (bgImgPath) {
          // 有云端图片：先绘制图片背景，再叠加文字
          const img = canvas.createImage();
          img.onload = () => {
            this._render(ctx, canvas, img);
          };
          img.onerror = () => {
            this._render(ctx, canvas, null);
          };
          img.src = bgImgPath;
        } else {
          this._render(ctx, canvas, null);
        }
      });
    } catch (e) {
      console.warn('drawPoster error', e);
    }
  },

  _render(ctx, canvas, bgImg) {
    this.renderCanvas(ctx, bgImg);
    wx.canvasToTempFilePath({
      canvas,
      fileType: 'jpg',
      quality: 0.95,
      success: (r) => this.setData({ imgUrl: r.tempFilePath }),
    });
  },

  renderCanvas(ctx, bgImg) {
    const test = this.test;
    const theme = test.theme;
    const code = this.getCode();
    const title = this.getTitle();
    const creed = (this.getCreed() || '').slice(0, 50);
    const main = theme.main || '#0E0E10';

    // ── 底色 ────────────────────────────────────────
    ctx.fillStyle = '#F4EEE3';
    ctx.fillRect(0, 0, W, H);

    // ── 上半部分 · 深色英雄块 ──────────────────────────
    ctx.fillStyle = '#0E0E10';
    ctx.fillRect(0, 0, W, 700);

    // 云端图片：叠加在深色块上，半透明
    if (bgImg) {
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.drawImage(bgImg, 0, 0, W, 700);
      ctx.restore();
    }

    // 装饰性渐变圆（主题色）
    const grad = ctx.createRadialGradient(W - 80, 80, 20, W - 80, 80, 340);
    grad.addColorStop(0, main + 'CC');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 700);

    // 装饰圆圈
    ctx.strokeStyle = 'rgba(244,238,227,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(W - 100, 130, 220, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(W - 100, 130, 140, 0, Math.PI * 2);
    ctx.stroke();

    // ── 顶部标签 ─────────────────────────────────────
    ctx.fillStyle = 'rgba(244,238,227,0.5)';
    ctx.font = '20px monospace';
    ctx.fillText('NINE MIRRORS · NO.' + String(test.idx || ''), 60, 90);

    // ── 测试名称 ─────────────────────────────────────
    ctx.fillStyle = 'rgba(244,238,227,0.9)';
    ctx.font = '600 34px serif';
    ctx.fillText(test.nameZh, 60, 160);

    ctx.fillStyle = 'rgba(244,238,227,0.4)';
    ctx.font = 'italic 24px serif';
    ctx.fillText(test.nameEn, 60, 200);

    // ── 结果代码大字 ──────────────────────────────────
    ctx.fillStyle = main;
    ctx.font = '700 ' + (code && code.length <= 4 ? '140' : '90') + 'px serif';
    ctx.fillText(code || test.glyph || '·', 60, 420);

    // ── 结果标题 ─────────────────────────────────────
    ctx.fillStyle = '#F4EEE3';
    ctx.font = '700 60px serif';
    ctx.fillText(title, 60, 510);

    // ── 分隔线 ───────────────────────────────────────
    ctx.strokeStyle = 'rgba(244,238,227,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 570);
    ctx.lineTo(W - 60, 570);
    ctx.stroke();

    // ── 格言（在深色块底部）─────────────────────────────
    ctx.fillStyle = 'rgba(244,238,227,0.7)';
    ctx.font = '26px serif';
    this.wrapText(ctx, creed, 60, 630, W - 120, 42);

    // ── 下半部分 · 浅色信息区 ─────────────────────────
    // 主题色装饰条
    ctx.fillStyle = main;
    ctx.fillRect(60, 760, 6, 80);

    ctx.fillStyle = '#0E0E10';
    ctx.font = '700 38px serif';
    ctx.fillText('心镜 · Nine Mirrors', 86, 800);

    ctx.fillStyle = '#605A4E';
    ctx.font = '24px serif';
    ctx.fillText('九面镜子 · 照见九种自己', 86, 840);

    // 测试类型 badge
    ctx.fillStyle = theme.bg || '#EFE7D6';
    this._roundRect(ctx, 60, 880, 260, 60, 30);
    ctx.fill();
    ctx.fillStyle = main;
    ctx.font = '600 24px monospace';
    ctx.fillText(test.cat + ' · ' + test.tag, 88, 917);

    // 扫码提示区
    ctx.strokeStyle = 'rgba(14,14,16,0.12)';
    ctx.lineWidth = 1;
    this._roundRect(ctx, 60, H - 280, W - 120, 220, 28);
    ctx.stroke();

    ctx.fillStyle = '#8B8578';
    ctx.font = '22px monospace';
    ctx.fillText('SCAN QR CODE TO TAKE THE TEST', 96, H - 220);

    ctx.fillStyle = '#0E0E10';
    ctx.font = '600 32px serif';
    ctx.fillText('扫码测一测，照见你自己', 96, H - 170);

    ctx.fillStyle = '#605A4E';
    ctx.font = '22px monospace';
    ctx.fillText(test.count + '题 · ' + test.duration + ' · 免费', 96, H - 120);
  },

  _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arc(x + w - r, y + r, r, -Math.PI / 2, 0);
    ctx.lineTo(x + w, y + h - r);
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
    ctx.lineTo(x + r, y + h);
    ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + r);
    ctx.arc(x + r, y + r, r, Math.PI, -Math.PI / 2);
    ctx.closePath();
  },

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let yy = y;
    for (let i = 0; i < chars.length; i++) {
      const t = line + chars[i];
      if (ctx.measureText(t).width > maxWidth) {
        ctx.fillText(line, x, yy);
        line = chars[i];
        yy += lineHeight;
      } else line = t;
    }
    ctx.fillText(line, x, yy);
  },

  getCode() {
    const r = this.result || {};
    return r.type || r.main || r.style || '';
  },
  getTitle() {
    const id = this.test.id;
    const r = this.result || {};
    if (id === 'mbti') return (require('../../data/results/mbti.js').getByType(r.type) || {}).title || '';
    if (id === 'sbti') return (require('../../data/results/sbti.js').getByType(r.type) || {}).title || '';
    if (id === 'color') return (require('../../data/results/color.js').getByType(r.main) || {}).title || '';
    if (id === 'attach') return (require('../../data/results/attach.js').getByType(r.style) || {}).title || '';
    if (id === 'enneagram') return (require('../../data/results/enneagram.js').getByType(r.main) || {}).title || '';
    if (id === 'holland') return (require('../../data/results/holland.js').getByType(r.main) || {}).title || '';
    if (id === 'love') return require('../../data/results/love.js').getResult(r.avg || 3).title;
    if (id === 'eq') return require('../../data/results/eq.js').totalLevel(r.total || 0, r.max || 200).title;
    if (id === 'ocean') return '大五剖面';
    return '';
  },
  getCreed() {
    const id = this.test.id;
    const r = this.result || {};
    if (id === 'mbti') return (require('../../data/results/mbti.js').getByType(r.type) || {}).creed || '';
    if (id === 'sbti') return (require('../../data/results/sbti.js').getByType(r.type) || {}).creed || '';
    if (id === 'color') return (require('../../data/results/color.js').getByType(r.main) || {}).creed || '';
    if (id === 'attach') return (require('../../data/results/attach.js').getByType(r.style) || {}).creed || '';
    if (id === 'enneagram') return (require('../../data/results/enneagram.js').getByType(r.main) || {}).creed || '';
    if (id === 'holland') return (require('../../data/results/holland.js').getByType(r.main) || {}).creed || '';
    if (id === 'love') return require('../../data/results/love.js').getResult(r.avg || 3).creed;
    return '';
  },

  onForward() {
    wx.shareAppMessage({
      title: `我的测试结果 · 心镜`,
      path: '/pages/explore/explore',
      imageUrl: this.data.imgUrl,
    });
  },

  onSave() {
    const url = this.data.imgUrl;
    if (!url) return;
    wx.getSetting({
      success: (res) => {
        const need = res.authSetting['scope.writePhotosAlbum'];
        const save = () => wx.saveImageToPhotosAlbum({
          filePath: url,
          success: () => wx.showToast({ title: '已保存到相册' }),
          fail: () => wx.showToast({ title: '保存失败', icon: 'none' }),
        });
        if (need === false) {
          wx.authorize({ scope: 'scope.writePhotosAlbum', success: save });
        } else save();
      },
    });
  },

  onShareAppMessage() {
    return {
      title: `我的${this.test.nameZh}结果 · 心镜`,
      path: '/pages/explore/explore',
      imageUrl: this.data.imgUrl,
    };
  },
});
