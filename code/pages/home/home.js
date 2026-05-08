const { TESTS } = require('../../data/tests.js');
const { getTodayWisdom } = require('../../data/wisdom.js');

function todayLabel() {
  const d = new Date();
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `本日 · ${mm}.${dd} · ${days[d.getDay()]}`;
}

Page({
  data: {
    tests: TESTS,
    today: todayLabel(),
    wisdom: getTodayWisdom(),
    featured: null,
  },

  onLoad() {
    const app = getApp();
    const init = (tests) => {
      const featured = tests.find(t => t.recommend) || tests[0];
      if (this.data) this.setData({ tests, featured });
    };
    if (app.globalData.tests) {
      init(app.globalData.tests);
    } else {
      init(TESTS);
      app.onTestsReady && app.onTestsReady(init);
    }
  },

  onTapTest(e) {
    wx.navigateTo({ url: `/pages/intro/intro?id=${e.currentTarget.dataset.id}` });
  },

  onTapAll() {
    wx.switchTab({ url: '/pages/explore/explore' });
  },

  onShareAppMessage() {
    return { title: '心镜 · 九面镜子照见九种自己', path: '/pages/home/home' };
  },

  onShareTimeline() {
    return { title: '心镜 · Nine Mirrors' };
  },
});
