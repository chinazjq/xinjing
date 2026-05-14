// Cloud storage fileID map for personality result images.
//
// Upload processed transparent assets to CloudBase Storage, then fill the
// returned fileID values here. Keep images out of the mini program package.
// Example:
//   mbti_INTJ: 'cloud://env-id.bucket/personality/mbti/INTJ.png'

const PERSONALITY_IMAGE_IDS = {
  mbti_INTJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/INTJ.png',
  mbti_INTP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/INTP.png',
  mbti_ENTJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ENTJ.png',
  mbti_ENTP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ENTP.png',
  mbti_INFJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/INFJ.png',
  mbti_INFP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/INFP.png',
  mbti_ENFJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ENFJ.png',
  mbti_ENFP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ENFP.png',
  mbti_ISTJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ISTJ.png',
  mbti_ISFJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ISFJ.png',
  mbti_ESTJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ESTJ.png',
  mbti_ESFJ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ESFJ.png',
  mbti_ISTP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ISTP.png',
  mbti_ISFP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ISFP.png',
  mbti_ESTP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ESTP.png',
  mbti_ESFP: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/mbti/ESFP.png',

  sbti_ATM: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/ATM.png',
  sbti_BOSS: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/BOSS.png',
  sbti_CTRL: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/CTRL.png',
  sbti_DEAD: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/DEAD.png',
  sbti_DIOR: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/DIOR.png',
  sbti_DRUNK: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/DRUNK.png',
  sbti_FAKE: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/FAKE.png',
  sbti_FIRE: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/FIRE.png',
  sbti_GOGO: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/GOGO.png',
  sbti_HHHH: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/HHHH.png',
  sbti_IMFW: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/IMFW.png',
  sbti_IMSB: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/IMSB.png',
  sbti_JOKER: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/JOKER.png',
  sbti_LOVER: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/LOVER.png',
  sbti_MALO: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/MALO.png',
  sbti_MONK: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/MONK.png',
  sbti_MUM: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/MUM.png',
  sbti_OHNO: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/OHNO.png',
  sbti_OJBK: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/OJBK.png',
  sbti_POOR: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/POOR.png',
  sbti_SEXY: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/SEXY.png',
  sbti_MESS: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/MESS.png',
  sbti_SOLO: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/SOLO.png',
  sbti_THANK: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/THANK.png',
  sbti_THINK: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/THINK.png',
  sbti_WOC: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/WOC.png',
  sbti_ZZZZ: 'cloud://test-d0gco2u752ad560f7.7465-test-d0gco2u752ad560f7-1422993808/personality/sbti/ZZZZ.png',
};

function getPersonalityImageFileID(testId, imageKey) {
  return PERSONALITY_IMAGE_IDS[testId + '_' + imageKey] || '';
}

module.exports = { PERSONALITY_IMAGE_IDS, getPersonalityImageFileID };
