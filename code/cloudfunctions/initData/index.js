/**
 * initData — 一次性数据初始化云函数
 * 调用方式: 在微信开发者工具右键该云函数 → "云端测试"，event 填 {} 即可
 * 若要强制重置已有数据，event 填 {"force": true}
 *
 * 会初始化 3 个集合:
 *   tests        — 9 个测试元数据
 *   result_defs  — 9 个结果类型定义（可在云数据库控制台直接编辑）
 *   questions    — 9 套题库（从 ./data/questions/ 读取）
 *
 * questions 种子数据: 请将 code/data/questions/*.js 复制到
 *   cloudfunctions/initData/data/questions/ 后再部署此云函数
 */

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// ──────────────────────────────────────────────
// TESTS 元数据
// ──────────────────────────────────────────────
const TESTS = [
  { testId: 'sbti', id: 'sbti', name: 'SBTI', nameZh: '搞怪人格', nameEn: 'social behavior type', cat: '趣味向', tag: 'FEATURED', idx: '01', count: 20, duration: '3 分钟', theme: { main: '#C94F1E', soft: '#F0997B', bg: '#FAECE7', token: 'ember' }, desc: '20 题 · 3 分钟 · 看看你是吗喽还是摆烂大师。', intro: '自创娱乐向人格测试，主打趣味性与社交话题性。共12种搞怪人格（吗喽型/酒鬼型/摆烂大师等）', theory: '原创娱乐向模型', glyph: 'S', hot: true, recommend: true },
  { testId: 'mbti', id: 'mbti', name: 'MBTI', nameZh: '十六型人格', nameEn: 'Myers-Briggs', cat: '性格类', tag: '严肃向', idx: '02', count: 60, duration: '10 分钟', theme: { main: '#7F77DD', soft: '#AFA9EC', bg: '#EEEDFE', token: 'iris' }, desc: '最经典的自我坐标，60 题定位一种你。', intro: 'Myers-Briggs Type Indicator，基于荣格心理类型理论。E/I · S/N · T/F · J/P 四维度定位16型人格。', theory: 'Myers–Briggs Type Indicator · 1944', glyph: 'M', hot: true },
  { testId: 'attach', id: 'attach', name: 'Attachment', nameZh: '依恋风格', nameEn: 'attachment', cat: '情感类', tag: '亲密关系', idx: '03', count: 40, duration: '6 分钟', theme: { main: '#2F5E4F', soft: '#5DCAA5', bg: '#E1F5EE', token: 'jade' }, desc: '安全、焦虑、回避或恐惧——你在爱里是谁？', intro: 'Bowlby依恋理论 + Bartholomew & Horowitz 四类型模型。焦虑维度 × 回避维度定位亲密关系模式。', theory: 'Bowlby · Bartholomew (1991)', glyph: 'A' },
  { testId: 'enneagram', id: 'enneagram', name: 'Enneagram', nameZh: '九型人格', nameEn: 'enneagram', cat: '性格类', tag: '动机分析', idx: '04', count: 72, duration: '12 分钟', theme: { main: '#EF9F27', soft: '#FAC775', bg: '#FAEEDA', token: 'amber' }, desc: '9 × 2 = 18 种心理动机截面。', intro: 'Enneagram九型人格理论，Oscar Ichazo现代化体系。9种核心动机 + 翼型分析。', theory: 'Oscar Ichazo · Enneagram', glyph: 'E' },
  { testId: 'holland', id: 'holland', name: 'Holland', nameZh: '霍兰德职业兴趣', nameEn: 'holland', cat: '职业类', tag: '职业向', idx: '05', count: 66, duration: '10 分钟', theme: { main: '#378ADD', soft: '#85B7EB', bg: '#E6F1FB', token: 'sky' }, desc: 'RIASEC 六边形 · 送一份职业清单。', intro: 'John Holland职业兴趣理论，RIASEC六边形模型。R现实/I研究/A艺术/S社会/E企业/C传统 六型。', theory: 'John Holland · 1959', glyph: 'H' },
  { testId: 'ocean', id: 'ocean', name: 'OCEAN', nameZh: '大五人格', nameEn: 'big five', cat: '性格类', tag: '心理学框架', idx: '06', count: 50, duration: '8 分钟', theme: { main: '#534AB7', soft: '#7F77DD', bg: '#EEEDFE', token: 'plum' }, desc: 'O · C · E · A · N 五维百分位。', intro: 'Costa & McCrae大五人格模型，当代心理学最广泛认可的人格框架。', theory: 'Costa & McCrae · 1992', glyph: 'O' },
  { testId: 'color', id: 'color', name: 'Chromatic', nameZh: '颜色性格', nameEn: 'chromatic', cat: '趣味类', tag: '快速测', idx: '07', count: 24, duration: '3 分钟', theme: { main: '#D94545', soft: '#EBC642', bg: '#F1EDE6', token: 'color' }, desc: '红 · 蓝 · 黄 · 绿——你本来是哪一种光？', intro: 'DISC理论变体的四色人格系统。红/蓝/黄/绿四色代表四种核心特质。', theory: 'DISC · Color Personality', glyph: '◉' },
  { testId: 'love', id: 'love', name: 'Love-Brain', nameZh: '恋爱脑程度', nameEn: 'love-brain', cat: '情感类', tag: '情感向', idx: '08', count: 30, duration: '5 分钟', theme: { main: '#D4537E', soft: '#ED93B1', bg: '#FBEAF0', token: 'rose' }, desc: '你是自由灵魂，还是重度恋爱脑？', intro: '趣味情感向测试，主打共鸣感和娱乐性。恋爱脑指数0-100% + 五级分层。', theory: '原创情感向模型', glyph: 'L' },
  { testId: 'eq', id: 'eq', name: 'EQ', nameZh: '情商测试', nameEn: 'emotional Q', cat: '性格类', tag: '成长向', idx: '09', count: 40, duration: '7 分钟', theme: { main: '#BA7517', soft: '#EF9F27', bg: '#FAEEDA', token: 'saffron' }, desc: 'Goleman 五大情商能力模型。', intro: 'Daniel Goleman情商框架。自我认知/自我调控/自我激励/同理心/社交技巧 五大能力。', theory: 'Daniel Goleman · 1995', glyph: 'Q' },
];

// ──────────────────────────────────────────────
// RESULT_DEFS — 结果类型定义（这里修改后重新部署即可更新云端数据）
// ──────────────────────────────────────────────
const RESULT_DEFS = {
  mbti: {
    types: {
      INTJ: { title: '建筑师', creed: '在无人看守的夜里，也要把蓝图画完。', strengths: ['长线思维', '战略规划', '独立自主'], shadows: ['过度冷峻', '难以妥协'], famous: ['马斯克', '尼采'], match: ['ENFP', 'ENTP'] },
      INTP: { title: '逻辑学家', creed: '真理不在掌声里，在沉默的推理中。', strengths: ['抽象分析', '好奇心', '原则坚定'], shadows: ['拖延', '情感疏离'], famous: ['爱因斯坦', '笛卡尔'], match: ['ENTJ', 'ESTJ'] },
      ENTJ: { title: '指挥官', creed: '把世界推向你想要的方向。', strengths: ['决断力', '领导力', '效率至上'], shadows: ['强势', '易忽视感受'], famous: ['史蒂夫·乔布斯'], match: ['INTP', 'INFP'] },
      ENTP: { title: '辩论家', creed: '点燃争论的火柴，只为看见真相。', strengths: ['创新', '快速学习', '机敏'], shadows: ['三分钟热度', '好胜'], famous: ['苏格拉底', '达芬奇'], match: ['INFJ', 'INTJ'] },
      INFJ: { title: '提倡者', creed: '静水流深，为那些说不出口的灵魂发声。', strengths: ['洞察人心', '理想主义', '深度共情'], shadows: ['过度理想化', '易耗尽'], famous: ['柏拉图', '甘地'], match: ['ENTP', 'ENFP'] },
      INFP: { title: '调停者', creed: '在寂静里守着一束火，等懂的人靠近。', strengths: ['真诚', '想象力', '价值观坚定'], shadows: ['回避冲突', '易自责'], famous: ['托尔金', '奥黛丽·赫本'], match: ['ENFJ', 'ENTJ'] },
      ENFJ: { title: '主人公', creed: '把爱放进别人的名字里。', strengths: ['感染力', '同理心', '组织力'], shadows: ['讨好', '忽视自己'], famous: ['奥巴马'], match: ['INFP', 'ISFP'] },
      ENFP: { title: '竞选者', creed: '世界是一场即兴演出，我来点亮它。', strengths: ['热情', '创意', '连接力'], shadows: ['虎头蛇尾', '情绪化'], famous: ['罗宾·威廉姆斯'], match: ['INTJ', 'INFJ'] },
      ISTJ: { title: '物流师', creed: '承诺过的事，刻在骨头上。', strengths: ['可靠', '严谨', '执行力'], shadows: ['固执', '难接受变化'], famous: ['华盛顿'], match: ['ESFP', 'ESTP'] },
      ISFJ: { title: '守护者', creed: '把温柔编进日常的针脚里。', strengths: ['细心', '忠诚', '默默付出'], shadows: ['压抑自我', '怕冲突'], famous: ['特蕾莎修女'], match: ['ESFP', 'ESTP'] },
      ESTJ: { title: '总经理', creed: '规则是通往结果最直的路。', strengths: ['组织力', '责任感', '务实'], shadows: ['刻板', '不够柔软'], famous: ['福特'], match: ['ISFP', 'ISTP'] },
      ESFJ: { title: '执政官', creed: '我的幸福是你们都好。', strengths: ['温暖', '协调', '尽责'], shadows: ['在意评价', '易操心'], famous: ['泰勒·斯威夫特'], match: ['ISFP', 'ISTP'] },
      ISTP: { title: '鉴赏家', creed: '不说废话，直接动手。', strengths: ['实用', '冷静', '机械直觉'], shadows: ['难以亲近', '逃避情感'], famous: ['贝尔·格里尔斯'], match: ['ESFJ', 'ESTJ'] },
      ISFP: { title: '探险家', creed: '用感官去记住这一刻。', strengths: ['审美', '敏感', '随性'], shadows: ['犹豫', '回避规划'], famous: ['鲍勃·迪伦'], match: ['ESFJ', 'ESTJ'] },
      ESTP: { title: '企业家', creed: '此刻就是战场。', strengths: ['行动派', '抗压', '适应力'], shadows: ['冒险', '不够耐心'], famous: ['丘吉尔'], match: ['ISFJ', 'ISTJ'] },
      ESFP: { title: '表演者', creed: '把每一天都过成节日。', strengths: ['热情', '共情', '活在当下'], shadows: ['回避长期', '情绪波动'], famous: ['玛丽莲·梦露'], match: ['ISFJ', 'ISTJ'] },
    }
  },
  sbti: {
    types: {
      '吗喽型': { title: '吗喽人', creed: '打工人的尊严是午觉', strengths: ['乐观', '顺势而为'], shadows: ['倦怠', '缺动力'], famous: ['网易云评论区'] },
      '酒鬼型': { title: '微醺诗人', creed: '清醒太痛，不如一醉', strengths: ['感性', '敢爱敢恨'], shadows: ['情绪化', '逃避'], famous: ['李白'] },
      '无所谓人': { title: '无所谓人', creed: '都可以，随便都行', strengths: ['松弛', '包容'], shadows: ['没主见', '被动'], famous: ['随缘派'] },
      '摆烂大师': { title: '摆烂大师', creed: '躺着才是最舒服的姿势', strengths: ['心态稳', '不内耗'], shadows: ['缺动力', '易放弃'], famous: ['躺平学'] },
      '社牛怪': { title: '社牛怪', creed: '陌生是缘分的开始', strengths: ['破冰王', '亲和'], shadows: ['边界弱', '易耗能'], famous: ['公园搭讪达人'] },
      '精神小伙': { title: '精神小伙', creed: '气势不能输', strengths: ['行动力', '敢出头'], shadows: ['冲动', '冒失'], famous: ['整顿职场'] },
      '养生达人': { title: '养生达人', creed: '活得久才是硬道理', strengths: ['自律', '节制'], shadows: ['过度焦虑健康'], famous: ['枸杞保温杯'] },
      'emo诗人': { title: 'emo诗人', creed: '我的眼泪不是为你', strengths: ['深情', '艺术'], shadows: ['易内耗', '钻牛角尖'], famous: ['凌晨三点发朋友圈'] },
      '卷王本王': { title: '卷王本王', creed: '卷死同行，感动自己', strengths: ['拼搏', '能扛'], shadows: ['焦虑', '难停下'], famous: ['学霸'] },
      '显眼包': { title: '显眼包', creed: '存在就要被看见', strengths: ['有梗', '活跃气氛'], shadows: ['过度表演'], famous: ['团建之王'] },
      '老好人': { title: '老好人', creed: '你们开心就好', strengths: ['温和', '可靠'], shadows: ['不会拒绝', '委屈自己'], famous: ['办公室便利贴'] },
      '独行侠': { title: '独行侠', creed: '一个人就是一支军队', strengths: ['独立', '专注'], shadows: ['孤僻', '拒绝求助'], famous: ['深夜编程者'] },
    }
  },
  color: {
    types: {
      R: { title: '红色·热烈', name: '红色性格', creed: '热情是我点燃世界的方式', strengths: ['感染力', '行动派', '乐观'], shadows: ['冲动', '缺耐心', '情绪化'], famous: ['三毛'], best: 'Y', worst: 'B' },
      B: { title: '蓝色·深邃', name: '蓝色性格', creed: '理性是我守护世界的方式', strengths: ['细致', '忠诚', '有原则'], shadows: ['悲观', '挑剔', '钻牛角尖'], famous: ['林黛玉'], best: 'G', worst: 'R' },
      Y: { title: '黄色·果敢', name: '黄色性格', creed: '结果是我证明自己的方式', strengths: ['执行力', '领导力', '自律'], shadows: ['独断', '缺耐性', '咄咄逼人'], famous: ['曹操'], best: 'R', worst: 'G' },
      G: { title: '绿色·温和', name: '绿色性格', creed: '和谐是我连接世界的方式', strengths: ['包容', '耐心', '稳重'], shadows: ['被动', '回避冲突', '缺主见'], famous: ['老子'], best: 'B', worst: 'Y' },
    }
  },
  attach: {
    types: {
      secure: { title: '安全型', creed: '我值得被爱，你也值得被信任', strengths: ['稳定', '开放表达', '能独立也能亲密'], shadows: ['偶尔过度理性'] },
      anxious: { title: '焦虑型', creed: '请靠近，再靠近一点', strengths: ['投入', '敏感', '善感知'], shadows: ['患得患失', '过度解读'] },
      avoidant: { title: '回避型', creed: '我一个人可以', strengths: ['独立', '冷静', '自足'], shadows: ['难表达脆弱', '拉远距离'] },
      fearful: { title: '矛盾型', creed: '想靠近，又怕受伤', strengths: ['敏锐', '深度反思'], shadows: ['推拉', '关系不稳'] },
    }
  },
  enneagram: {
    types: {
      1: { title: '完美型', creed: '把事情做对，是我对世界的态度', strengths: ['原则', '自律', '理想主义'], shadows: ['挑剔', '苛责自己'], famous: ['甘地'] },
      2: { title: '助人型', creed: '被需要，是我的幸福', strengths: ['热心', '同理', '慷慨'], shadows: ['讨好', '忽视自我'], famous: ['特蕾莎修女'] },
      3: { title: '成就型', creed: '被看见，是我存在的证明', strengths: ['高效', '适应', '有野心'], shadows: ['工作狂', '怕失败'], famous: ['泰勒·斯威夫特'] },
      4: { title: '自我型', creed: '独特，是我与世界的距离', strengths: ['敏感', '艺术', '深度'], shadows: ['忧郁', '自怜'], famous: ['王家卫'] },
      5: { title: '思考型', creed: '先搞清楚，再走入其中', strengths: ['钻研', '冷静', '独立'], shadows: ['抽离', '情感疏远'], famous: ['比尔·盖茨'] },
      6: { title: '忠诚型', creed: '预想风险，才能安稳前行', strengths: ['可靠', '警觉', '忠诚'], shadows: ['多疑', '犹豫'], famous: ['乔治·H·W·布什'] },
      7: { title: '活跃型', creed: '人生要有趣', strengths: ['乐观', '创意', '多元'], shadows: ['难专注', '回避痛苦'], famous: ['史蒂芬·斯皮尔伯格'] },
      8: { title: '领袖型', creed: '强大，才能保护在乎的人', strengths: ['果决', '正义感', '有力量'], shadows: ['控制欲', '难示弱'], famous: ['马丁·路德·金'] },
      9: { title: '和平型', creed: '和谐比对错重要', strengths: ['包容', '平和', '温柔'], shadows: ['拖延', '压抑冲突'], famous: ['林肯'] },
    }
  },
  holland: {
    types: {
      R: { title: '现实型·工匠', creed: '亲手做出来的，才是真的', traits: ['动手', '务实', '机械'], jobs: ['工程师', '技师', '运动员'] },
      I: { title: '研究型·学者', creed: '弄懂它，才是我的满足', traits: ['好奇', '逻辑', '探索'], jobs: ['科学家', '分析师', '研究员'] },
      A: { title: '艺术型·创造者', creed: '美是我的语言', traits: ['创意', '审美', '自由'], jobs: ['设计师', '作家', '音乐人'] },
      S: { title: '社会型·助人者', creed: '帮到别人，就是值得', traits: ['温暖', '共情', '服务'], jobs: ['教师', '咨询师', '社工'] },
      E: { title: '企业型·领导者', creed: '抓住机会，推动改变', traits: ['说服', '野心', '进取'], jobs: ['创业者', '销售', '管理者'] },
      C: { title: '常规型·组织者', creed: '一丝不苟，井井有条', traits: ['规范', '条理', '精准'], jobs: ['会计', '审计', '行政'] },
    }
  },
  ocean: {
    dims: {
      O: { name: '开放性', high: '想象力丰富，乐于尝鲜', low: '务实传统，喜欢熟悉' },
      C: { name: '尽责性', high: '自律可靠，有条理', low: '随性灵活，不爱计划' },
      E: { name: '外倾性', high: '热情外放，社交能量高', low: '内敛安静，喜欢独处' },
      A: { name: '宜人性', high: '友善合作，富有同理', low: '独立务实，敢于直言' },
      N: { name: '神经质', high: '敏感易焦虑', low: '情绪稳定，抗压强' },
    }
  },
  eq: {
    dims: {
      SA: { name: '自我认知', desc: '识别自己情绪的能力' },
      SR: { name: '自我调控', desc: '管理情绪不被情绪管理' },
      SM: { name: '自我激励', desc: '为长远目标延迟满足' },
      EM: { name: '同理心', desc: '感知他人情绪的能力' },
      SS: { name: '社交技巧', desc: '建立关系、化解冲突' },
    },
    levels: [
      { minPct: 0.8, title: '情商高手', creed: '稳住情绪，看清人心' },
      { minPct: 0.6, title: '情商良好', creed: '有觉察，也有行动' },
      { minPct: 0.4, title: '情商普通', creed: '偶有起伏，但会调整' },
      { minPct: 0, title: '情商待提升', creed: '先看见，再改变' },
    ]
  },
  love: {
    levels: [
      { minAvg: 4, title: '重度恋爱脑', creed: '爱人的光刺眼，自己的影子却淡了', level: '⚠️ 警戒', advice: '记得把重心放回自己' },
      { minAvg: 3.2, title: '中度恋爱脑', creed: '会为爱让步，但还守得住底线', level: '高', advice: '小心不要再往前一步' },
      { minAvg: 2.5, title: '轻度恋爱脑', creed: '偶尔上头，但还算清醒', level: '中', advice: '保持这份平衡很不错' },
      { minAvg: 0, title: '清醒派', creed: '爱你是锦上添花，不是全部', level: '低', advice: '继续做独立而温柔的人' },
    ]
  },
};

// ──────────────────────────────────────────────
// 辅助：检查集合是否已有数据
// ──────────────────────────────────────────────
async function collectionEmpty(col) {
  const res = await db.collection(col).limit(1).get();
  return res.data.length === 0;
}

// ──────────────────────────────────────────────
// 主函数
// ──────────────────────────────────────────────
exports.main = async (event) => {
  const { force = false } = event || {};
  const log = [];

  // ── 1. 初始化 tests ──
  if (force || await collectionEmpty('tests')) {
    for (const t of TESTS) {
      await db.collection('tests').add({ data: t });
    }
    log.push(`tests: seeded ${TESTS.length} records`);
  } else {
    log.push('tests: already exists, skipped');
  }

  // ── 2. 初始化 result_defs ──
  if (force || await collectionEmpty('result_defs')) {
    for (const [testId, defs] of Object.entries(RESULT_DEFS)) {
      await db.collection('result_defs').add({ data: { testId, defs } });
    }
    log.push(`result_defs: seeded ${Object.keys(RESULT_DEFS).length} records`);
  } else {
    log.push('result_defs: already exists, skipped');
  }

  // ── 3. 初始化 questions（可选，需先复制题库文件到 ./data/questions/）──
  if (force || await collectionEmpty('questions')) {
    const testIds = ['sbti', 'mbti', 'attach', 'enneagram', 'holland', 'ocean', 'color', 'love', 'eq'];
    let seeded = 0;
    for (const id of testIds) {
      try {
        const qs = require(`./data/questions/${id}.js`);
        const list = Array.isArray(qs) ? qs : (qs.QUESTIONS || []);
        if (list.length) {
          await db.collection('questions').add({ data: { testId: id, list } });
          seeded++;
        }
      } catch (e) {
        log.push(`questions/${id}: skipped (file not found)`);
      }
    }
    if (seeded) log.push(`questions: seeded ${seeded} question banks`);
  } else {
    log.push('questions: already exists, skipped');
  }

  return { ok: true, log };
};
