const { getPersonalityImageFileID } = require('../data/personalityImages.js');

const _cache = Object.create(null);

function resolvePersonalityImage(testId, imageKey) {
  const fileID = getPersonalityImageFileID(testId, imageKey);
  if (!fileID) return Promise.resolve('');
  if (/^https?:\/\//.test(fileID)) return Promise.resolve(fileID);
  if (_cache[fileID]) return Promise.resolve(_cache[fileID]);
  if (!wx.cloud) return Promise.resolve('');

  return new Promise((resolve) => {
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: (res) => {
        const item = res.fileList && res.fileList[0];
        const url = item && (item.tempFileURL || item.fileID);
        _cache[fileID] = url || '';
        resolve(_cache[fileID]);
      },
      fail: () => resolve(''),
    });
  });
}

module.exports = { resolvePersonalityImage };
