const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { testId } = event;
  if (!testId) return { ok: false, msg: 'testId required' };
  try {
    const res = await db.collection('questions').where({ testId }).limit(1).get();
    const doc = res.data[0];
    if (!doc) return { ok: false, msg: 'not found' };
    return { ok: true, list: doc.list };
  } catch (e) {
    return { ok: false, msg: e.message };
  }
};
