const { getTestById } = require('../../data/tests.js');
const { loadResultDefs } = require('../../utils/cloud.js');
const { getCelebrities } = require('../../data/celebrities.js');
const { resolvePersonalityImage } = require('../../utils/personalityImage.js');

const MBTI_TAG_MAP = { E: 'EXTRAVERTED', I: 'INTROVERTED', S: 'SENSING', N: 'INTUITIVE', T: 'THINKING', F: 'FEELING', J: 'JUDGING', P: 'PROSPECTING' };
const MBTI_DIM_INFO = [
  { key: 'EI', pos: { name: '外向 E', l: 'E', r: 'I' }, neg: { name: '内向 I', l: 'I', r: 'E' } },
  { key: 'SN', pos: { name: '实感 S', l: 'S', r: 'N' }, neg: { name: '直觉 N', l: 'N', r: 'S' } },
  { key: 'TF', pos: { name: '思考 T', l: 'T', r: 'F' }, neg: { name: '情感 F', l: 'F', r: 'T' } },
  { key: 'JP', pos: { name: '判断 J', l: 'J', r: 'P' }, neg: { name: '感知 P', l: 'P', r: 'J' } },
];

function mbtiDims(rawDims) {
  return MBTI_DIM_INFO.map(({ key, pos, neg }) => {
    const score = (rawDims || {})[key] || 0;
    const info = score >= 0 ? pos : neg;
    const pct = Math.round(Math.min(99, Math.max(51, (Math.abs(score) + 12) / 24 * 100)));
    return { key, name: info.name, left: info.l, right: info.r, percent: pct, value: info.l };
  });
}

function buildDisplay(testId, result, defs) {
  if (!result) return {};

  function types(localModule) {
    if (defs && defs.types) return defs.types;
    return require(localModule).TYPES;
  }

  let display = {};

  switch (testId) {
    case 'mbti': {
      const info = (types('../../data/results/mbti.js'))[result.type] || {};
      const tags = (result.type || '').split('').map(c => MBTI_TAG_MAP[c] || c);
      display = {
        code: result.type, title: info.title || result.type,
        creed: info.creed || '', tags,
        strengths: info.strengths || [], shadows: info.shadows || [],
        famous: info.famous || [], match: info.match || [],
        dims: mbtiDims(result.dims),
        desc: info.desc || [],
        imageKey: info.imageKey || result.type,
        _celebKey: result.type,
      };
      break;
    }
    case 'sbti': {
      const info = (types('../../data/results/sbti.js'))[result.type] || {};
      display = {
        code: result.type, title: info.title || result.type, creed: info.creed || '',
        strengths: info.strengths || [], shadows: info.shadows || [],
        famous: info.famous || [],
        desc: info.desc || [],
        imageKey: info.imageKey || result.type,
        _celebKey: result.type,
      };
      break;
    }
    case 'color': {
      const info = (types('../../data/results/color.js'))[result.main] || {};
      display = {
        code: result.main, title: info.title || '', creed: info.creed || '',
        strengths: info.strengths || [], shadows: info.shadows || [],
        famous: info.famous || [],
        desc: info.desc || [],
        _celebKey: result.main,
      };
      break;
    }
    case 'attach': {
      const info = (types('../../data/results/attach.js'))[result.style] || {};
      display = {
        code: result.style, title: info.title || '', creed: info.creed || '',
        strengths: info.strengths || [], shadows: info.shadows || [],
        dims: [
          { key: 'A', name: '焦虑维度', value: (result.A || 0).toFixed(1), percent: Math.round((result.A || 0) / 5 * 100) },
          { key: 'V', name: '回避维度', value: (result.V || 0).toFixed(1), percent: Math.round((result.V || 0) / 5 * 100) },
        ],
        desc: info.desc || [],
        _celebKey: result.style,
      };
      break;
    }
    case 'enneagram': {
      const info = (types('../../data/results/enneagram.js'))[result.main] || {};
      display = {
        code: String(result.main) + 'W' + String(result.sub || ''),
        title: info.title || '', creed: info.creed || '',
        strengths: info.strengths || [], shadows: info.shadows || [],
        famous: info.famous || [],
        desc: info.desc || [],
        _celebKey: String(result.main),
      };
      break;
    }
    case 'holland': {
      const info = (types('../../data/results/holland.js'))[result.main] || {};
      display = {
        code: (result.top3 || []).join(''),
        title: info.title || '', creed: info.creed || '',
        strengths: info.traits || [], famous: info.jobs || [],
        desc: info.desc || [],
        _celebKey: result.main,
      };
      break;
    }
    case 'ocean': {
      const dimDefs = (defs && defs.dims) || require('../../data/results/ocean.js').DIMS;
      const dims = Object.keys(dimDefs).map(k => ({
        key: k, name: dimDefs[k].name,
        value: ((result.avg || {})[k] || 3) >= 3 ? dimDefs[k].high : dimDefs[k].low,
        percent: Math.round(((result.avg || {})[k] || 3) / 5 * 100),
      }));
      const generalDesc = require('../../data/results/ocean.js').GENERAL_DESC || [];
      display = { code: '', title: '大五剖面', creed: '每一项都是你独特的坐标', dims, desc: generalDesc, _celebKey: 'default' };
      break;
    }
    case 'eq': {
      const dimDefs = (defs && defs.dims) || require('../../data/results/eq.js').DIMS;
      const levels = (defs && defs.levels) || null;
      const pct = (result.total || 0) / (result.max || 200);
      let lv;
      if (levels) {
        lv = levels.find(l => pct >= l.minPct) || levels[levels.length - 1];
      } else {
        lv = require('../../data/results/eq.js').totalLevel(result.total || 0, result.max || 200);
      }
      const dims = Object.keys(dimDefs).map(k => ({
        key: k, name: dimDefs[k].name,
        value: ((result.avg || {})[k] || 3) >= 4 ? '高' : ((result.avg || {})[k] || 3) >= 3 ? '中' : '低',
        percent: Math.round(((result.avg || {})[k] || 3) / 5 * 100),
      }));
      display = { code: '', title: lv.title, creed: lv.creed, dims, desc: lv.desc || [], _celebKey: 'default' };
      break;
    }
    case 'love': {
      const levels = (defs && defs.levels) || null;
      const avg = result.avg || 3;
      let info;
      if (levels) {
        info = levels.find(l => avg >= l.minAvg) || levels[levels.length - 1];
      } else {
        info = require('../../data/results/love.js').getResult(avg);
      }
      display = {
        code: info.level, title: info.title, creed: info.creed,
        strengths: [info.advice],
        dims: [{ key: 'avg', name: '恋爱脑指数', value: avg.toFixed(1), percent: Math.round((avg / 5) * 100) }],
        desc: info.desc || [],
        _celebKey: 'default',
      };
      break;
    }
    default:
      display = { title: '结果', creed: '', desc: [] };
  }

  // 注入结构化名人数据（优先于旧的 famous 字符串列表）
  const celebs = getCelebrities(testId, display._celebKey || 'default');
  display.famousData = celebs;
  delete display._celebKey;

  return display;
}

Page({
  data: { test: null, unlocked: true, display: {} },

  resolveImage(display) {
    if (!display || !display.imageKey) return;
    const testId = this.data.testId;
    const imageKey = display.imageKey;
    resolvePersonalityImage(testId, imageKey).then((imageUrl) => {
      if (!imageUrl || !this.data || this.data.testId !== testId || this.data.display.imageKey !== imageKey) return;
      this.setData({ 'display.imageUrl': imageUrl });
    });
  },

  async onLoad(opt) {
    const test = getTestById(opt.id);
    if (!test) { wx.navigateBack(); return; }

    const app = getApp();
    const result = app.globalData.currentResult;

    const display = buildDisplay(opt.id, result, null);
    this.setData({
      test,
      testId: opt.id,
      unlocked: opt.unlocked === '1',
      display,
    });
    this.resolveImage(display);
    wx.setNavigationBarTitle({ title: test.nameZh + ' · 结果' });

    loadResultDefs(opt.id).then((defs) => {
      if (!defs) return;
      const updated = buildDisplay(opt.id, result, defs);
      if (this.data) this.setData({ display: updated });
      this.resolveImage(updated);
    });
  },

  onUnlock() {
    wx.navigateTo({ url: `/pages/ad/ad?id=${this.data.testId}` });
  },

  onShare() {
    wx.navigateTo({ url: `/pages/share/share?id=${this.data.testId}` });
  },

  onAgain() {
    wx.reLaunch({ url: '/pages/explore/explore' });
  },

  onShareAppMessage() {
    const d = this.data.display;
    return {
      title: `我的${this.data.test.nameZh}结果：${d.title || d.code}`,
      path: '/pages/explore/explore',
    };
  },
});
