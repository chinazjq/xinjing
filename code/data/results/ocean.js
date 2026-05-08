// 大五人格 OCEAN 维度描述
const DIMS = {
  O: { name: '开放性', high: '想象力丰富，乐于尝鲜', low: '务实传统，喜欢熟悉' },
  C: { name: '尽责性', high: '自律可靠，有条理', low: '随性灵活，不爱计划' },
  E: { name: '外倾性', high: '热情外放，社交能量高', low: '内敛安静，喜欢独处' },
  A: { name: '宜人性', high: '友善合作，富有同理', low: '独立务实，敢于直言' },
  N: { name: '神经质', high: '敏感易焦虑', low: '情绪稳定，抗压强' },
};

const GENERAL_DESC = [
  '大五人格不是在告诉你"你是什么类型"，而是在给你画一张五维坐标图——每一项都不是好坏之分，而是你独特的心理地形。',
  '开放性影响你对新体验的接纳度；尽责性决定你自我组织的方式；外向性决定你从哪里获得能量；宜人性是你与他人协作的底色；神经质性则是你情绪调节系统的灵敏度。',
  '最重要的不是每个维度的高低，而是它们如何组合成只属于你的那幅地图。读懂这张图，你就能在对的环境里放大优势，在压力面前提前认出自己的模式。',
];

function levelLabel(avg) {
  if (avg >= 4) return '高';
  if (avg >= 3) return '中高';
  if (avg >= 2) return '中低';
  return '低';
}

function getSummary(avg) {
  const parts = [];
  Object.keys(DIMS).forEach((k) => {
    const v = avg[k] || 3;
    const label = levelLabel(v);
    parts.push({ dim: k, name: DIMS[k].name, level: label, desc: v >= 3 ? DIMS[k].high : DIMS[k].low });
  });
  return parts;
}

module.exports = { DIMS, GENERAL_DESC, levelLabel, getSummary };
