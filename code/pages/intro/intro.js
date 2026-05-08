const { getTestById } = require('../../data/tests.js');

Page({
  data: { test: null },
  onLoad(opt) {
    const test = getTestById(opt.id);
    if (!test) { wx.navigateBack(); return; }
    wx.setNavigationBarTitle({ title: test.nameZh });
    this.setData({ test, testId: opt.id });
    const app = getApp();
    app.globalData.currentTest = test;
    app.globalData.currentAnswers = [];
    app.globalData.startAt = Date.now();
  },
  onStart() {
    wx.navigateTo({ url: `/pages/quiz/quiz?id=${this.data.testId}` });
  },
});
