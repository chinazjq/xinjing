const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  try {
    const res = await db.collection('results')
      .where({ _openid: OPENID })
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();
    return { ok: true, list: res.data };
  } catch (e) {
    return { ok: false, msg: e.message || String(e) };
  }
};
