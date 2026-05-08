const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const { action, data } = event;

  try {
    if (action === 'get') {
      const res = await db.collection('users').where({ _openid: OPENID }).limit(1).get();
      return { ok: true, user: res.data[0] || null };
    }

    if (action === 'save') {
      const existing = await db.collection('users').where({ _openid: OPENID }).limit(1).get();
      if (existing.data.length) {
        await db.collection('users').doc(existing.data[0]._id).update({
          data: { ...data, updatedAt: Date.now() },
        });
      } else {
        await db.collection('users').add({
          data: { _openid: OPENID, ...data, createdAt: Date.now(), updatedAt: Date.now() },
        });
      }
      return { ok: true };
    }

    if (action === 'getHistory') {
      const res = await db.collection('results')
        .where({ _openid: OPENID })
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
      return { ok: true, list: res.data };
    }

    return { ok: false, msg: 'unknown action' };
  } catch (e) {
    return { ok: false, msg: e.message };
  }
};
