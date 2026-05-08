const { getTestById } = require('../../data/tests.js');
const { loadQuestions } = require('../../utils/cloud.js');

const MODE_MAP = {
  mbti: 'binary', enneagram: 'binary', holland: 'binary',
  sbti: 'multi', color: 'multi',
  attach: 'likert', ocean: 'likert', eq: 'likert', love: 'likert',
};

Page({
  data: {
    testId: '',
    mode: 'binary',
    theme: {},
    index: 0,
    total: 0,
    percent: 0,
    current: {},
    letters: ['A', 'B', 'C', 'D'],
  },

  async onLoad(opt) {
    const test = getTestById(opt.id);
    if (!test) { wx.navigateBack(); return; }

    wx.setNavigationBarTitle({ title: test.nameZh });
    this.setData({ testId: opt.id, theme: test.theme });

    const qs = await loadQuestions(opt.id);
    const mode = MODE_MAP[opt.id] || 'binary';
    this._questions = qs;
    this._answers = new Array(qs.length);

    this.setData({
      mode,
      total: qs.length,
      current: qs[0],
      index: 0,
      percent: Math.round((1 / qs.length) * 100),
    });
  },

  advance(ans) {
    this._answers[this.data.index] = ans;
    const nextIdx = this.data.index + 1;
    if (nextIdx >= this.data.total) {
      this.finish(this._answers);
      return;
    }
    this.setData({
      index: nextIdx,
      current: this._questions[nextIdx],
      percent: Math.round(((nextIdx + 1) / this.data.total) * 100),
    });
  },

  onPickBinary(e) { this.advance(e.currentTarget.dataset.v); },
  onPickMulti(e)  { this.advance(Number(e.currentTarget.dataset.i)); },
  onPickLikert(e) { this.advance(Number(e.currentTarget.dataset.v)); },

  onBack() {
    if (this.data.index === 0) return;
    const prev = this.data.index - 1;
    this.setData({
      index: prev,
      current: this._questions[prev],
      percent: Math.round(((prev + 1) / this.data.total) * 100),
    });
  },

  finish(answers) {
    const app = getApp();
    app.globalData.currentAnswers = answers;
    app.globalData.currentTestId = this.data.testId;
    app.globalData.startAt = app.globalData.startAt || Date.now();
    wx.redirectTo({ url: `/pages/ad/ad?id=${this.data.testId}` });
  },
});
