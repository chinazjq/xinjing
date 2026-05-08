// 每日箴言数据 — 按日期轮播（day-of-year mod length）
// 可扩充至 365 条；当前维护 30 条供轮播

const WISDOMS = [
  { text: '知人者智，自知者明。', author: '老子', source: '《道德经》', theme: 'ember' },
  { text: '吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？', author: '曾参', source: '《论语》', theme: 'jade' },
  { text: '天行健，君子以自强不息。', author: '', source: '《周易·乾》', theme: 'amber' },
  { text: '路漫漫其修远兮，吾将上下而求索。', author: '屈原', source: '《离骚》', theme: 'iris' },
  { text: '静以修身，俭以养德，非淡泊无以明志，非宁静无以致远。', author: '诸葛亮', source: '《诫子书》', theme: 'jade' },
  { text: '你遇见的每个人，都是你自己的一面镜子。', author: '卡尔·荣格', source: '', theme: 'plum' },
  { text: '我们无法改变事物，除非我们先接受它。', author: '卡尔·荣格', source: '', theme: 'sky' },
  { text: '想象力比知识更重要，知识是有限的，而想象力概括着世界的一切。', author: '爱因斯坦', source: '', theme: 'amber' },
  { text: '心有猛虎，细嗅蔷薇。', author: '西格夫里·萨松', source: '', theme: 'rose' },
  { text: '每一个不曾起舞的日子，都是对生命的辜负。', author: '尼采', source: '', theme: 'ember' },
  { text: '你的时间有限，不要浪费在活别人的生活上。', author: '史蒂夫·乔布斯', source: '', theme: 'amber' },
  { text: '成为你自己，其余的一切都会随之而来。', author: '爱默生', source: '', theme: 'jade' },
  { text: '世界以痛吻我，要我回报以歌。', author: '泰戈尔', source: '', theme: 'rose' },
  { text: '勇敢并不是不感到恐惧，而是认定有些事情比恐惧更重要。', author: '纳尔逊·曼德拉', source: '', theme: 'ember' },
  { text: '人生就像骑单车，要保持平衡，就得不断前行。', author: '爱因斯坦', source: '', theme: 'sky' },
  { text: '不忘初心，方得始终。', author: '', source: '《华严经》', theme: 'jade' },
  { text: '生命中的最大冒险是不去冒险。', author: '欧普拉·温弗瑞', source: '', theme: 'iris' },
  { text: '幸福不是拥有你所要的，而是欣赏你所有的。', author: '', source: '犹太谚语', theme: 'amber' },
  { text: '不是因为有些事情难以做到，我们才失去自信；而是因为我们失去了自信，那些事情才变得难以做到。', author: '塞内卡', source: '', theme: 'plum' },
  { text: '行动起来，成为你希望在世界上看到的那种改变。', author: '圣雄甘地', source: '', theme: 'amber' },
  { text: '我没有失败过，我只是找到了一万种行不通的方法。', author: '托马斯·爱迪生', source: '', theme: 'ember' },
  { text: '真正的自我认知，是最艰难的功课，也是最重要的功课。', author: '苏格拉底', source: '', theme: 'jade' },
  { text: '如果你评判他人，你就没有时间去爱他们。', author: '特蕾莎修女', source: '', theme: 'rose' },
  { text: '唯一值得恐惧的，是恐惧本身。', author: '富兰克林·罗斯福', source: '', theme: 'sky' },
  { text: '平静不是远离问题，而是面对问题时内心的宁静。', author: '达赖喇嘛', source: '', theme: 'jade' },
  { text: '当你凝视深渊时，深渊也在凝视你。', author: '尼采', source: '《善恶的彼岸》', theme: 'plum' },
  { text: '我是我自己最好的作品，也是最难完成的那件。', author: '', source: '', theme: 'iris' },
  { text: '你比你想象的更强大，比你知道的更有能力，比你相信的更有价值。', author: 'C.S.刘易斯', source: '', theme: 'amber' },
  { text: '凡是过往，皆为序章。', author: '莎士比亚', source: '《暴风雨》', theme: 'ember' },
  { text: '种一棵树最好的时间是十年前，其次是现在。', author: '', source: '中国谚语', theme: 'jade' },
];

function getTodayWisdom() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return WISDOMS[dayOfYear % WISDOMS.length];
}

module.exports = { WISDOMS, getTodayWisdom };
