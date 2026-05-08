const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const { record } = event;
  if (!record) return { ok: false, msg: 'no record' };
  try {
    const res = await db.collection('results').add({
      data: {
        _openid: OPENID,
        testId: record.testId,
        testName: record.testName,
        result: record.result,
        duration: record.duration || 0,
        createdAt: Date.now(),
      },
    });
    return { ok: true, id: res._id };
  } catch (e) {
    return { ok: false, msg: e.message || String(e) };
  }
};
