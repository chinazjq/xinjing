// app.js 心镜 Nine Mirrors
const { TESTS } = require("./data/tests.js");
const { loadTests } = require("./utils/cloud.js");
const { trackActiveDay } = require("./utils/storage.js");

App({
  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({ env: "test-d0gco2u752ad560f7", traceUser: true });
    }
    trackActiveDay();
    this.initThemeWatcher();
    this.loadLocalHistory();
    this.preloadTests();
  },

  initThemeWatcher() {
    const sys = wx.getSystemInfoSync();
    this.globalData.theme = sys.theme || "light";
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.globalData.theme = theme;
      });
    }
  },

  loadLocalHistory() {
    try {
      this.globalData.history = wx.getStorageSync("testHistory") || [];
    } catch (e) {
      this.globalData.history = [];
    }
  },

  preloadTests() {
    loadTests().then((list) => {
      this.globalData.tests = list;
      // 通知已等待的页面
      const cbs = this.globalData._testsCbs || [];
      cbs.forEach((cb) => cb(list));
      this.globalData._testsCbs = [];
    });
  },

  // 页面可订阅 tests 加载完成事件
  onTestsReady(cb) {
    if (this.globalData.tests) {
      cb(this.globalData.tests);
      return;
    }
    this.globalData._testsCbs = this.globalData._testsCbs || [];
    this.globalData._testsCbs.push(cb);
  },

  saveHistory(record) {
    const history = this.globalData.history || [];
    history.unshift(record);
    this.globalData.history = history.slice(0, 100);
    wx.setStorageSync("testHistory", this.globalData.history);
    if (wx.cloud) {
      wx.cloud.callFunction({
        name: "saveResult",
        data: { record },
        fail: () => {
          /* offline silent */
        },
      });
    }
  },

  globalData: {
    theme: "light",
    history: [],
    tests: null, // 云端加载后填充，null 表示尚未加载
    currentTest: null,
    currentAnswers: [],
    currentResult: null,
    _testsCbs: [],
  },
});
