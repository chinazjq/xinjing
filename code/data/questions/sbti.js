// SBTI question bank adapted from yondddd/sbti-test zh.json.
// Keep the dim/value fields: scoring maps 15 dimensions to source type patterns.

const QUESTIONS = [
  {
    id: "q1",
    dim: "S1",
    q: "我不仅是屌丝，我还是joker,我还是咸鱼，这辈子没谈过一场恋爱，胆怯又自卑，我的青春就是一场又一场的意淫，每一天幻想着我也能有一个女孩子和我一起压马路，一起逛街，一起玩，现实却是爆了父母金币，读了个烂学校，混日子之后找班上，没有理想，没有目标，没有能力的三无人员，每次看到你能在网上开屌丝的玩笑，我都想哭，我就是地底下的老鼠，透过下水井的缝隙，窥探地上的各种美好，每一次看到这种都是对我心灵的一次伤害，对我生存空间的一次压缩，求求哥们给我们这种小丑一点活路吧，我真的不想在白天把枕巾哭湿一大片",
    opts: [
      {
        t: "我哭了。。",
        value: 1
      },
      {
        t: "这是什么。。",
        value: 2
      },
      {
        t: "这不是我！",
        value: 3
      }
    ]
  },
  {
    id: "q2",
    dim: "S1",
    q: "我不够好，周围的人都比我优秀",
    opts: [
      {
        t: "确实",
        value: 1
      },
      {
        t: "有时",
        value: 2
      },
      {
        t: "不是",
        value: 3
      }
    ]
  },
  {
    id: "q3",
    dim: "S2",
    q: "我很清楚真正的自己是什么样的",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "q4",
    dim: "S2",
    q: "我内心有真正追求的东西",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "q5",
    dim: "S3",
    q: "我一定要不断往上爬、变得更厉害",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "q6",
    dim: "S3",
    q: "外人的评价对我来说无所吊谓。",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "q7",
    dim: "E1",
    q: "对象超过5小时没回消息，说自己窜稀了，你会怎么想？",
    opts: [
      {
        t: "拉稀不可能5小时，也许ta隐瞒了我。",
        value: 1
      },
      {
        t: "在信任和怀疑之间摇摆。",
        value: 2
      },
      {
        t: "也许今天ta真的不太舒服。",
        value: 3
      }
    ]
  },
  {
    id: "q8",
    dim: "E1",
    q: "我在感情里经常担心被对方抛弃",
    opts: [
      {
        t: "是的",
        value: 1
      },
      {
        t: "偶尔",
        value: 2
      },
      {
        t: "不是",
        value: 3
      }
    ]
  },
  {
    id: "q9",
    dim: "E2",
    q: "我对天发誓，我对待每一份感情都是认真的！",
    opts: [
      {
        t: "并没有",
        value: 1
      },
      {
        t: "也许？",
        value: 2
      },
      {
        t: "是的！（问心无愧骄傲脸）",
        value: 3
      }
    ]
  },
  {
    id: "q10",
    dim: "E2",
    q: "你的恋爱对象是一个尊老爱幼，温柔敦厚，洁身自好，光明磊落，大义凛然，能言善辩，口才流利，观察入微，见多识广，博学多才，诲人不倦，和蔼可亲，平易近人，心地善良，慈眉善目，积极进取，意气风发，玉树临风，国色天香，倾国倾城，花容月貌的人，此时你会？",
    opts: [
      {
        t: "就算ta再优秀我也不会陷入太深。",
        value: 1
      },
      {
        t: "会介于A和C之间。",
        value: 2
      },
      {
        t: "会非常珍惜ta，也许会变成恋爱脑。",
        value: 3
      }
    ]
  },
  {
    id: "q11",
    dim: "E3",
    q: "恋爱后，对象非常黏人，你作何感想？",
    opts: [
      {
        t: "那很爽了",
        value: 1
      },
      {
        t: "都行无所谓",
        value: 2
      },
      {
        t: "我更喜欢保留独立空间",
        value: 3
      }
    ]
  },
  {
    id: "q12",
    dim: "E3",
    q: "我在任何关系里都很重视个人空间",
    opts: [
      {
        t: "我更喜欢依赖与被依赖",
        value: 1
      },
      {
        t: "看情况",
        value: 2
      },
      {
        t: "是的！（斩钉截铁地说道）",
        value: 3
      }
    ]
  },
  {
    id: "q13",
    dim: "A1",
    q: "大多数人是善良的",
    opts: [
      {
        t: "其实邪恶的人心比世界上的痔疮更多。",
        value: 1
      },
      {
        t: "也许吧。",
        value: 2
      },
      {
        t: "是的，我愿相信好人更多。",
        value: 3
      }
    ]
  },
  {
    id: "q14",
    dim: "A1",
    q: "你走在街上，一位萌萌的小女孩蹦蹦跳跳地朝你走来（正脸、侧脸看都萌，用vivo、苹果、华为、OPPO手机看都萌，实在是非常萌的那种），她递给你一根棒棒糖，此时你作何感想？",
    opts: [
      {
        t: "呜呜她真好真可爱！居然给我棒棒糖！",
        value: 3
      },
      {
        t: "一脸懵逼，作挠头状",
        value: 2
      },
      {
        t: "这也许是一种新型诈骗？还是走开为好。",
        value: 1
      }
    ]
  },
  {
    id: "q15",
    dim: "A2",
    q: "快考试了，学校规定必须上晚自习，请假会扣分，但今晚你约了女/男神一起玩《绝地求生：刺激战场》（一款刺激的游戏），你怎么办？",
    opts: [
      {
        t: "翘了！反正就一次！",
        value: 1
      },
      {
        t: "干脆请个假吧。",
        value: 2
      },
      {
        t: "都快考试了还去啥。",
        value: 3
      }
    ]
  },
  {
    id: "q16",
    dim: "A2",
    q: "我喜欢打破常规，不喜欢被束缚",
    opts: [
      {
        t: "认同",
        value: 1
      },
      {
        t: "保持中立",
        value: 2
      },
      {
        t: "不认同",
        value: 3
      }
    ]
  },
  {
    id: "q17",
    dim: "A3",
    q: "我做事通常有目标。",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "q18",
    dim: "A3",
    q: "突然某一天，我意识到人生哪有什么他妈的狗屁意义，人不过是和动物一样被各种欲望支配着，纯纯是被激素控制的东西，饿了就吃，困了就睡，一发情就想交配，我们简直和猪狗一样没什么区别。",
    opts: [
      {
        t: "是这样的。",
        value: 1
      },
      {
        t: "也许是，也许不是。",
        value: 2
      },
      {
        t: "这简直是胡扯",
        value: 3
      }
    ]
  },
  {
    id: "q19",
    dim: "Ac1",
    q: "我做事主要为了取得成果和进步，而不是避免麻烦和风险。",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "q20",
    dim: "Ac1",
    q: "你因便秘坐在马桶上（已长达30分钟），拉不出很难受。此时你更像",
    opts: [
      {
        t: "再坐三十分钟看看，说不定就有了。",
        value: 1
      },
      {
        t: "用力拍打自己的屁股并说：“死屁股，快拉啊！”",
        value: 2
      },
      {
        t: "使用开塞露，快点拉出来才好。",
        value: 3
      }
    ]
  },
  {
    id: "q21",
    dim: "Ac2",
    q: "我做决定比较果断，不喜欢犹豫",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "q22",
    dim: "Ac2",
    q: "此题没有题目，请盲选",
    opts: [
      {
        t: "反复思考后感觉应该选A？",
        value: 1
      },
      {
        t: "啊，要不选B？",
        value: 2
      },
      {
        t: "不会就选C？",
        value: 3
      }
    ]
  },
  {
    id: "q23",
    dim: "Ac3",
    q: "别人说你“执行力强”，你内心更接近哪句？",
    opts: [
      {
        t: "我被逼到最后确实执行力超强。。。",
        value: 1
      },
      {
        t: "啊，有时候吧。",
        value: 2
      },
      {
        t: "是的，事情本来就该被推进",
        value: 3
      }
    ]
  },
  {
    id: "q24",
    dim: "Ac3",
    q: "我做事常常有计划，____",
    opts: [
      {
        t: "然而计划不如变化快。",
        value: 1
      },
      {
        t: "有时能完成，有时不能。",
        value: 2
      },
      {
        t: "我讨厌被打破计划。",
        value: 3
      }
    ]
  },
  {
    id: "q25",
    dim: "So1",
    q: "你因玩《第五人格》（一款刺激的游戏）而结识许多网友，并被邀请线下见面，你的想法是？",
    opts: [
      {
        t: "网上口嗨下就算了，真见面还是有点忐忑。",
        value: 1
      },
      {
        t: "见网友也挺好，反正谁来聊我就聊两句。",
        value: 2
      },
      {
        t: "我会打扮一番并热情聊天，万一呢，我是说万一呢？",
        value: 3
      }
    ]
  },
  {
    id: "q26",
    dim: "So1",
    q: "朋友带了ta的朋友一起来玩，你最可能的状态是",
    opts: [
      {
        t: "对“朋友的朋友”天然有点距离感，怕影响二人关系",
        value: 1
      },
      {
        t: "看对方，能玩就玩。",
        value: 2
      },
      {
        t: "朋友的朋友应该也算我的朋友！要热情聊天",
        value: 3
      }
    ]
  },
  {
    id: "q27",
    dim: "So2",
    q: "我和人相处主打一个电子围栏，靠太近会自动报警。",
    opts: [
      {
        t: "认同",
        value: 3
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "不认同",
        value: 1
      }
    ]
  },
  {
    id: "q28",
    dim: "So2",
    q: "我渴望和我信任的人关系密切，熟得像失散多年的亲戚。",
    opts: [
      {
        t: "认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "不认同",
        value: 3
      }
    ]
  },
  {
    id: "q29",
    dim: "So3",
    q: "有时候你明明对一件事有不同的、负面的看法，但最后没说出来。多数情况下原因是：",
    opts: [
      {
        t: "这种情况较少。",
        value: 1
      },
      {
        t: "可能碍于情面或者关系。",
        value: 2
      },
      {
        t: "不想让别人知道自己是个阴暗的人。",
        value: 3
      }
    ]
  },
  {
    id: "q30",
    dim: "So3",
    q: "我在不同人面前会表现出不一样的自己",
    opts: [
      {
        t: "不认同",
        value: 1
      },
      {
        t: "中立",
        value: 2
      },
      {
        t: "认同",
        value: 3
      }
    ]
  },
  {
    id: "drink_gate_q1",
    special: true,
    kind: "drink_gate",
    q: "您平时有什么爱好？",
    opts: [
      {
        t: "吃喝拉撒",
        value: 1
      },
      {
        t: "艺术爱好",
        value: 2
      },
      {
        t: "饮酒",
        value: 3
      },
      {
        t: "健身",
        value: 4
      }
    ]
  },
  {
    id: "drink_gate_q2",
    special: true,
    kind: "drink_trigger",
    q: "您对饮酒的态度是？",
    opts: [
      {
        t: "小酌怡情，喝不了太多。",
        value: 1
      },
      {
        t: "我习惯将白酒灌在保温杯，当白开水喝，酒精令我信服。",
        value: 2
      }
    ]
  }
];

const DIMENSION_ORDER = [
  "S1",
  "S2",
  "S3",
  "E1",
  "E2",
  "E3",
  "A1",
  "A2",
  "A3",
  "Ac1",
  "Ac2",
  "Ac3",
  "So1",
  "So2",
  "So3"
];

const DIMENSION_META = {
  S1: {
    name: "S1 自尊自信",
    model: "自我模型"
  },
  S2: {
    name: "S2 自我清晰度",
    model: "自我模型"
  },
  S3: {
    name: "S3 核心价值",
    model: "自我模型"
  },
  E1: {
    name: "E1 依恋安全感",
    model: "情感模型"
  },
  E2: {
    name: "E2 情感投入度",
    model: "情感模型"
  },
  E3: {
    name: "E3 边界与依赖",
    model: "情感模型"
  },
  A1: {
    name: "A1 世界观倾向",
    model: "态度模型"
  },
  A2: {
    name: "A2 规则与灵活度",
    model: "态度模型"
  },
  A3: {
    name: "A3 人生意义感",
    model: "态度模型"
  },
  Ac1: {
    name: "Ac1 动机导向",
    model: "行动驱力模型"
  },
  Ac2: {
    name: "Ac2 决策风格",
    model: "行动驱力模型"
  },
  Ac3: {
    name: "Ac3 执行模式",
    model: "行动驱力模型"
  },
  So1: {
    name: "So1 社交主动性",
    model: "社交模型"
  },
  So2: {
    name: "So2 人际边界感",
    model: "社交模型"
  },
  So3: {
    name: "So3 表达与真实度",
    model: "社交模型"
  }
};

const TYPE_PATTERNS = [
  {
    type: "CTRL",
    sourceCode: "CTRL",
    pattern: "HHH-HMH-MHH-HHH-MHM"
  },
  {
    type: "ATM",
    sourceCode: "ATM-er",
    pattern: "HHH-HHM-HHH-HMH-MHL"
  },
  {
    type: "DIOR",
    sourceCode: "Dior-s",
    pattern: "MHM-MMH-MHM-HMH-LHL"
  },
  {
    type: "BOSS",
    sourceCode: "BOSS",
    pattern: "HHH-HMH-MMH-HHH-LHL"
  },
  {
    type: "THANK",
    sourceCode: "THAN-K",
    pattern: "MHM-HMM-HHM-MMH-MHL"
  },
  {
    type: "OHNO",
    sourceCode: "OH-NO",
    pattern: "HHL-LMH-LHH-HHM-LHL"
  },
  {
    type: "GOGO",
    sourceCode: "GOGO",
    pattern: "HHM-HMH-MMH-HHH-MHM"
  },
  {
    type: "SEXY",
    sourceCode: "SEXY",
    pattern: "HMH-HHL-HMM-HMM-HLH"
  },
  {
    type: "LOVER",
    sourceCode: "LOVE-R",
    pattern: "MLH-LHL-HLH-MLM-MLH"
  },
  {
    type: "MUM",
    sourceCode: "MUM",
    pattern: "MMH-MHL-HMM-LMM-HLL"
  },
  {
    type: "FAKE",
    sourceCode: "FAKE",
    pattern: "HLM-MML-MLM-MLM-HLH"
  },
  {
    type: "OJBK",
    sourceCode: "OJBK",
    pattern: "MMH-MMM-HML-LMM-MML"
  },
  {
    type: "MALO",
    sourceCode: "MALO",
    pattern: "MLH-MHM-MLH-MLH-LMH"
  },
  {
    type: "JOKER",
    sourceCode: "JOKE-R",
    pattern: "LLH-LHL-LML-LLL-MLM"
  },
  {
    type: "WOC",
    sourceCode: "WOC!",
    pattern: "HHL-HMH-MMH-HHM-LHH"
  },
  {
    type: "THINK",
    sourceCode: "THIN-K",
    pattern: "HHL-HMH-MLH-MHM-LHH"
  },
  {
    type: "MESS",
    sourceCode: "SHIT",
    pattern: "HHL-HLH-LMM-HHM-LHH"
  },
  {
    type: "ZZZZ",
    sourceCode: "ZZZZ",
    pattern: "MHL-MLH-LML-MML-LHM"
  },
  {
    type: "POOR",
    sourceCode: "POOR",
    pattern: "HHL-MLH-LMH-HHH-LHL"
  },
  {
    type: "MONK",
    sourceCode: "MONK",
    pattern: "HHL-LLH-LLM-MML-LHM"
  },
  {
    type: "IMSB",
    sourceCode: "IMSB",
    pattern: "LLM-LMM-LLL-LLL-MLM"
  },
  {
    type: "SOLO",
    sourceCode: "SOLO",
    pattern: "LML-LLH-LHL-LML-LHM"
  },
  {
    type: "FIRE",
    sourceCode: "FUCK",
    pattern: "MLL-LHL-LLM-MLL-HLH"
  },
  {
    type: "DEAD",
    sourceCode: "DEAD",
    pattern: "LLL-LLM-LML-LLL-LHM"
  },
  {
    type: "IMFW",
    sourceCode: "IMFW",
    pattern: "LLH-LHL-LML-LLL-MLL"
  }
];

const FALLBACK_TYPE = 'HHHH';
const DRUNK_TYPE = 'DRUNK';
const DRUNK_TRIGGER_QUESTION_ID = "drink_gate_q2";

module.exports = QUESTIONS;
module.exports.DIMENSION_ORDER = DIMENSION_ORDER;
module.exports.DIMENSION_META = DIMENSION_META;
module.exports.TYPE_PATTERNS = TYPE_PATTERNS;
module.exports.FALLBACK_TYPE = FALLBACK_TYPE;
module.exports.DRUNK_TYPE = DRUNK_TYPE;
module.exports.DRUNK_TRIGGER_QUESTION_ID = DRUNK_TRIGGER_QUESTION_ID;
