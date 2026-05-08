const storage = require('../../utils/storage.js');
const { getActiveDays } = storage;
const { formatDate } = require('../../utils/format.js');
const { getTestById } = require('../../data/tests.js');
const { getCloudHistory, getUserProfile, saveUserProfile } = require('../../utils/cloud.js');

function codeOf(r) {
  if (!r || !r.result) return '—';
  return r.result.type || r.result.main || r.result.style || '·';
}

function toRow(r) {
  const test = getTestById(r.testId);
  return {
    id: r.id || r._id,
    testId: r.testId,
    testName: r.testName,
    createdAt: r.createdAt,
    dateText: formatDate(r.createdAt),
    codeText: codeOf(r),
    pillColor: test ? test.theme.main : '#8B8578',
  };
}

Page({
  data: {
    history: [],
    stats: { total: 0, unique: 0, days: 0 },
    user: null,
  },

  onShow() {
    this._loadLocal();
    this._loadCloud();
  },

  _loadLocal() {
    const raw = storage.getHistory();
    this._rawMap = {};
    raw.forEach(r => { this._rawMap[r.id || r._id] = r; });
    const history = raw.map(toRow);
    const uniq = new Set(raw.map(r => r.testId)).size;
    this.setData({ history, stats: { total: raw.length, unique: uniq, days: getActiveDays() } });
  },

  async _loadCloud() {
    const cloudList = await getCloudHistory();
    if (!cloudList.length) return;

    const local = storage.getHistory();
    const localIds = new Set(local.map(r => r.id));
    const merged = [...local];
    cloudList.forEach(r => {
      if (!localIds.has(r._id)) merged.push({ ...r, id: r._id });
    });
    merged.sort((a, b) => b.createdAt - a.createdAt);

    if (!this._rawMap) this._rawMap = {};
    merged.forEach(r => { this._rawMap[r.id || r._id] = r; });

    const history = merged.map(toRow);
    const uniq = new Set(merged.map(r => r.testId)).size;
    const days = new Set(merged.map(r => formatDate(r.createdAt))).size;
    if (this.data) this.setData({ history, stats: { total: merged.length, unique: uniq, days } });

    const user = await getUserProfile();
    if (user && this.data) this.setData({ user });
  },

  onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl;
    const user = Object.assign({}, this.data.user || {}, { avatarUrl });
    this.setData({ user });
    saveUserProfile({ nickname: (user.nickname || ''), avatarUrl });
  },

  onNicknameChange(e) {
    const nickname = e.detail.value;
    if (!nickname) return;
    const user = Object.assign({}, this.data.user || {}, { nickname });
    this.setData({ user });
    saveUserProfile({ nickname, avatarUrl: ((this.data.user || {}).avatarUrl || '') });
  },

  onTap(e) {
    const rid = e.currentTarget.dataset.rid;
    const raw = this._rawMap && this._rawMap[rid];
    if (!raw) return;
    getApp().globalData.currentResult = raw.result;
    wx.navigateTo({ url: `/pages/result/result?id=${raw.testId}&unlocked=1` });
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除这条记录？',
      content: '仅删除本地记录',
      confirmText: '删除',
      confirmColor: '#C94F1E',
      success: (res) => {
        if (res.confirm) { storage.deleteRecord(id); this._loadLocal(); }
      },
    });
  },

  onClear() {
    wx.showModal({
      title: '清空镜册？',
      content: '本地历史记录将被删除',
      success: (res) => {
        if (res.confirm) { storage.clearHistory(); this._loadLocal(); }
      },
    });
  },
});
