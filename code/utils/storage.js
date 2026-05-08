// 本地 + 云端历史记录封装
const HISTORY_KEY = 'testHistory';
const ACTIVE_DAYS_KEY = 'activeDays';
const MAX_LOCAL = 50;

function trackActiveDay() {
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  try {
    const days = wx.getStorageSync(ACTIVE_DAYS_KEY) || [];
    if (!days.includes(today)) {
      days.push(today);
      wx.setStorageSync(ACTIVE_DAYS_KEY, days);
    }
  } catch (e) {}
}

function getActiveDays() {
  try {
    return (wx.getStorageSync(ACTIVE_DAYS_KEY) || []).length;
  } catch (e) {
    return 0;
  }
}

function getHistory() {
  try {
    return wx.getStorageSync(HISTORY_KEY) || [];
  } catch (e) {
    return [];
  }
}

function saveHistory(record) {
  const list = getHistory();
  list.unshift(record);
  const trimmed = list.slice(0, MAX_LOCAL);
  try {
    wx.setStorageSync(HISTORY_KEY, trimmed);
  } catch (e) {}
  if (wx.cloud) {
    wx.cloud.callFunction({
      name: 'saveResult',
      data: { record },
    }).catch(() => {});
  }
  return trimmed;
}

function getByTestId(testId) {
  return getHistory().filter((r) => r.testId === testId);
}

function getLatest(testId) {
  return getByTestId(testId)[0] || null;
}

function deleteRecord(id) {
  const list = getHistory().filter(r => (r.id || r._id) !== id);
  try {
    wx.setStorageSync(HISTORY_KEY, list);
  } catch (e) {}
}

function clearHistory() {
  try {
    wx.removeStorageSync(HISTORY_KEY);
  } catch (e) {}
}

function makeRecord({ testId, testName, result, duration }) {
  return {
    id: `${testId}_${Date.now()}`,
    testId,
    testName,
    result,
    duration: duration || 0,
    createdAt: Date.now(),
  };
}

module.exports = {
  getHistory,
  saveHistory,
  getByTestId,
  getLatest,
  deleteRecord,
  clearHistory,
  makeRecord,
  trackActiveDay,
  getActiveDays,
};
