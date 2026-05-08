const { TESTS } = require('../../data/tests.js');

function makeParticles(n) {
  return Array.from({ length: n }, (_, i) => {
    const x = (Math.random() * 93).toFixed(1);
    const y = (Math.random() * 88).toFixed(1);
    const w = (Math.random() * 2.5 + 1).toFixed(1);
    const dur = (Math.random() * 2.5 + 2).toFixed(1);
    const del = (Math.random() * 6).toFixed(1);
    const anim = i % 3 === 0 ? 'float-pt' : 'twinkle';
    return {
      style: `left:${x}%;top:${y}%;width:${w}px;height:${w}px;animation:${anim} ${dur}s ${del}s ease-in-out infinite`
    };
  });
}

Page({
  data: {
    tests: TESTS,
    particles: makeParticles(32)
  },

  onLoad() {
    const app = getApp();
    if (app.globalData.tests) {
      this.setData({ tests: app.globalData.tests });
    } else {
      app.onTestsReady((tests) => {
        if (this.data) this.setData({ tests });
      });
    }
  },

  onTap(e) {
    wx.navigateTo({ url: `/pages/intro/intro?id=${e.currentTarget.dataset.id}` });
  }
});
