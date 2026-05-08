const { getTestById } = require('../../data/tests.js');
const scoring = require('../../utils/scoring.js');
const storage = require('../../utils/storage.js');

// 替换为实际广告位 ID
const AD_UNIT_ID = 'adunit-xxxxxxxxxxxx';

function runScoring(testId, answers) {
  const qs = require('../../data/questions/' + testId + '.js');
  switch (testId) {
    case 'mbti': return scoring.scoreMBTI(qs, answers);
    case 'sbti': return scoring.scoreSBTI(qs, answers);
    case 'color': return scoring.scoreColor(qs, answers);
    case 'attach': return scoring.scoreAttach(qs, answers);
    case 'ocean': return scoring.scoreLikertDim(qs, answers);
    case 'eq': {
      const dim = scoring.scoreLikertDim(qs, answers);
      const total = scoring.scoreLikertTotal(qs, answers);
      return { ...dim, ...total };
    }
    case 'love': return scoring.scoreLikertTotal(qs, answers);
    case 'enneagram': return scoring.scoreTwoWay(qs, answers);
    case 'holland': return scoring.scoreTwoWay(qs, answers);
    default: return {};
  }
}

Page({
  data: { testId: '', test: {} },

  onLoad(opt) {
    const test = getTestById(opt.id) || {};
    this.setData({ testId: opt.id, test });
    try {
      if (wx.createRewardedVideoAd) {
        this.videoAd = wx.createRewardedVideoAd({ adUnitId: AD_UNIT_ID });
        this.videoAd.onError((err) => {
          console.warn('rewardedVideoAd error', err);
        });
        this.videoAd.onClose((res) => {
          if (res && res.isEnded) this.goResult(true);
        });
      }
    } catch (e) {
      console.warn('ad init fail', e);
    }
  },

  onWatch() {
    if (!this.videoAd) { this.goResult(true); return; }
    this.videoAd.show().catch(() => {
      this.videoAd.load().then(() => this.videoAd.show()).catch(() => this.goResult(true));
    });
  },

  onSkip() {
    this.goResult(false);
  },

  goResult(unlocked) {
    const app = getApp();
    const testId = this.data.testId;
    const answers = app.globalData.currentAnswers || [];
    const result = runScoring(testId, answers);
    const test = getTestById(testId);
    const record = storage.makeRecord({
      testId,
      testName: test.nameZh,
      result,
      duration: app.globalData.duration || 0,
    });
    storage.saveHistory(record);
    app.globalData.currentResult = result;
    app.globalData.currentRecord = record;
    wx.redirectTo({
      url: `/pages/result/result?id=${testId}&unlocked=${unlocked ? 1 : 0}`,
    });
  },

  onUnload() {
    if (this.videoAd) { try { this.videoAd.offClose(); this.videoAd.offError(); } catch (e) {} }
  },
});
