/**
 * utils/cloud.js — 云端数据统一入口
 *
 * 每类数据都有内存缓存 + 本地兜底：
 *   loadTests()          → 测试元数据列表
 *   loadQuestions(id)    → 题目列表
 *   loadResultDefs(id)   → 结果类型定义
 *   getCloudHistory()    → 云端历史记录（合并用）
 *   saveUserProfile(p)   → 保存用户昵称/头像
 *   getUserProfile()     → 读取用户信息
 */

const { TESTS } = require('../data/tests.js');

const _cache = Object.create(null);

function _call(name, data) {
  return new Promise((resolve, reject) => {
    if (!wx.cloud) { reject(new Error('no cloud')); return; }
    wx.cloud.callFunction({ name, data, success: r => resolve(r.result), fail: reject });
  });
}

// ─── Tests (always local — metadata is static) ─────────────────────────────

function loadTests() {
  return Promise.resolve(TESTS);
}

// ─── Questions ─────────────────────────────────────────────────────────────

async function loadQuestions(testId) {
  const key = 'q:' + testId;
  if (_cache[key]) return _cache[key];
  try {
    const r = await _call('getQuestions', { testId });
    if (r.ok && Array.isArray(r.list) && r.list.length) {
      _cache[key] = r.list;
      return r.list;
    }
  } catch (e) { /* fall through */ }
  const qs = _localQuestions(testId);
  _cache[key] = qs;
  return qs;
}

function _localQuestions(id) {
  switch (id) {
    case 'mbti':      return require('../data/questions/mbti.js');
    case 'sbti':      return require('../data/questions/sbti.js');
    case 'color':     return require('../data/questions/color.js');
    case 'love':      return require('../data/questions/love.js');
    case 'attach':    return require('../data/questions/attach.js');
    case 'ocean':     return require('../data/questions/ocean.js');
    case 'eq':        return require('../data/questions/eq.js');
    case 'enneagram': return require('../data/questions/enneagram.js');
    case 'holland':   return require('../data/questions/holland.js');
    default: return [];
  }
}

// ─── Result defs ───────────────────────────────────────────────────────────

async function loadResultDefs(testId) {
  const key = 'rd:' + testId;
  if (key in _cache) return _cache[key];
  try {
    const r = await _call('getResultDefs', { testId });
    if (r.ok && r.defs) {
      _cache[key] = r.defs;
      return r.defs;
    }
  } catch (e) { /* fall through */ }
  _cache[key] = null;
  return null;
}

// ─── User profile ──────────────────────────────────────────────────────────

async function getUserProfile() {
  try {
    const r = await _call('userFn', { action: 'get' });
    return r.ok ? r.user : null;
  } catch (e) { return null; }
}

async function saveUserProfile(profile) {
  try {
    await _call('userFn', { action: 'save', data: profile });
  } catch (e) { /* silent */ }
}

// ─── Cloud history (合并到本地历史) ─────────────────────────────────────────

async function getCloudHistory() {
  try {
    const r = await _call('userFn', { action: 'getHistory' });
    return r.ok ? (r.list || []) : [];
  } catch (e) { return []; }
}

module.exports = { loadTests, loadQuestions, loadResultDefs, getUserProfile, saveUserProfile, getCloudHistory };
