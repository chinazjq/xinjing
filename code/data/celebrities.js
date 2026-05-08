// 同款灵魂名人数据 — 按测试ID + 结果类型索引
// avatarKey 预留云存储图片键名，可后续通过 CloudBase 存储对应头像图片

const CELEBRITIES = {
  mbti: {
    INTJ: [
      { name: '埃隆·马斯克', role: 'Tesla & SpaceX 创始人', quote: '当一件事足够重要，即使胜算不大，你也要去做。', avatarKey: 'elon_musk' },
      { name: '尼古拉·特斯拉', role: '发明家 · 电气工程师', quote: '我不关心别人的信念，只关心事物的原理。', avatarKey: 'tesla' },
    ],
    INTP: [
      { name: '阿尔伯特·爱因斯坦', role: '理论物理学家', quote: '想象力比知识更重要。', avatarKey: 'einstein' },
      { name: '比尔·盖茨', role: '微软联合创始人', quote: '成功是个烂老师，它诱使聪明人觉得自己不会失败。', avatarKey: 'bill_gates' },
    ],
    ENTJ: [
      { name: '史蒂夫·乔布斯', role: '苹果公司联合创始人', quote: '你的时间有限，不要浪费在活别人的生活上。', avatarKey: 'jobs' },
      { name: '玛格丽特·撒切尔', role: '英国前首相', quote: '立场坚定，是一种美德。', avatarKey: 'thatcher' },
    ],
    ENTP: [
      { name: '托马斯·爱迪生', role: '发明家 · 商人', quote: '我没有失败过，我只是找到了一万种行不通的方法。', avatarKey: 'edison' },
      { name: '马克·吐温', role: '作家 · 幽默大师', quote: '只要坚持真相，你就不必记住你说过什么。', avatarKey: 'twain' },
    ],
    INFJ: [
      { name: '马丁·路德·金', role: '民权运动领袖', quote: '即使知道世界明天就要毁灭，我今天仍然要种下一棵苹果树。', avatarKey: 'mlk' },
      { name: '圣雄甘地', role: '印度独立运动领袖', quote: '成为你希望在世界上看到的那种改变。', avatarKey: 'gandhi' },
    ],
    INFP: [
      { name: 'J.K.罗琳', role: '《哈利·波特》作者', quote: '我们每个人内心都有黑暗与光明，重要的是我们选择成为哪一个。', avatarKey: 'jk_rowling' },
      { name: '梵高', role: '后印象派画家', quote: '我梦想着绘画，我画着我的梦想。', avatarKey: 'van_gogh' },
    ],
    ENFJ: [
      { name: '巴拉克·奥巴马', role: '美国第44任总统', quote: '改变不会自动到来，改变需要我们每个人。', avatarKey: 'obama' },
      { name: '欧普拉·温弗瑞', role: '媒体大亨 · 慈善家', quote: '你成为今天的你，是你过去每一个选择的结果。', avatarKey: 'oprah' },
    ],
    ENFP: [
      { name: '罗宾·威廉姆斯', role: '演员 · 喜剧演员', quote: '你只有一次生命，但如果你做对了，一次就够了。', avatarKey: 'robin_williams' },
      { name: '安妮·弗兰克', role: '日记作家', quote: '尽管如此，我仍然相信人们本质上是善良的。', avatarKey: 'anne_frank' },
    ],
    ISTJ: [
      { name: '沃伦·巴菲特', role: '投资大师 · 伯克希尔CEO', quote: '只有退潮时，你才知道谁在裸泳。', avatarKey: 'buffett' },
      { name: '乔治·华盛顿', role: '美国开国总统', quote: '诚实是最好的政策。', avatarKey: 'washington' },
    ],
    ISFJ: [
      { name: '特蕾莎修女', role: '诺贝尔和平奖得主', quote: '如果你评判他人，你就没有时间去爱他们。', avatarKey: 'mother_teresa' },
      { name: '碧昂斯', role: '歌手 · 演员', quote: '我是我自己构建的，我是我所相信的。', avatarKey: 'beyonce' },
    ],
    ESTJ: [
      { name: '约翰·D·洛克菲勒', role: '标准石油创始人', quote: '友谊建立在商业基础上，比商业建立在友谊基础上要好。', avatarKey: 'rockefeller' },
      { name: '希拉里·克林顿', role: '美国前国务卿', quote: '女性的权利是人类的权利。', avatarKey: 'hillary' },
    ],
    ESFJ: [
      { name: '泰勒·斯威夫特', role: '创作型歌手', quote: '我只是个在追逐梦想的普通女孩，我不打算道歉。', avatarKey: 'taylor_swift' },
      { name: '戴安娜王妃', role: '英国王妃', quote: '只有你，才是自己生命的主角。', avatarKey: 'diana' },
    ],
    ISTP: [
      { name: '李小龙', role: '武打演员 · 武术家', quote: '知道还不够，你必须要运用。愿意还不够，你必须要行动。', avatarKey: 'bruce_lee' },
      { name: '迈克尔·乔丹', role: 'NBA篮球明星', quote: '我总是把输球当成一种动力，而不是借口。', avatarKey: 'jordan' },
    ],
    ISFP: [
      { name: '迈克尔·杰克逊', role: '流行乐之王', quote: '如果你想让这个世界变得更美好，先从镜子里的那个人开始改变。', avatarKey: 'mj' },
      { name: '毕加索', role: '立体主义画派创始人', quote: '每个孩子都是艺术家，问题在于如何在长大后仍然保持艺术家的状态。', avatarKey: 'picasso' },
    ],
    ESTP: [
      { name: '玛丽莲·梦露', role: '演员 · 流行文化偶像', quote: '如果你不能忍受我最坏的一面，你也不值得拥有我最好的一面。', avatarKey: 'monroe' },
      { name: '欧内斯特·海明威', role: '作家 · 诺贝尔文学奖得主', quote: '一个人可以被消灭，但不能被打败。', avatarKey: 'hemingway' },
    ],
    ESFP: [
      { name: '艾尔顿·约翰', role: '摇滚音乐人 · 慈善家', quote: '音乐能触及我们无法触及的心灵深处。', avatarKey: 'elton_john' },
      { name: '莫扎特', role: '古典音乐作曲家', quote: '音乐不是由音符构成的，而是由音符之间的空隙构成的。', avatarKey: 'mozart' },
    ],
  },

  sbti: {
    '吗喽型': [
      { name: '鲁迅', role: '文学家 · 思想家', quote: '人类的悲欢并不相通，我只觉得他们吵闹。', avatarKey: 'luxun' },
      { name: '钱钟书', role: '作家 · 学者', quote: '围城里的人想出去，围城外的人想进来。', avatarKey: 'qian' },
    ],
    '酒鬼型': [
      { name: '李白', role: '唐代诗人', quote: '举杯邀明月，对影成三人。', avatarKey: 'libai' },
      { name: '苏轼', role: '宋代文学家', quote: '人生如逆旅，我亦是行人。', avatarKey: 'sushi' },
    ],
    '无所谓人': [
      { name: '庄子', role: '道家哲学家', quote: '至人无己，神人无功，圣人无名。', avatarKey: 'zhuangzi' },
      { name: '陶渊明', role: '东晋诗人', quote: '此中有真意，欲辨已忘言。', avatarKey: 'tao' },
    ],
    '摆烂大师': [
      { name: '陶渊明', role: '东晋诗人', quote: '采菊东篱下，悠然见南山。', avatarKey: 'tao' },
      { name: '林语堂', role: '作家 · 学者', quote: '享受悠闲生活，是人类的最高境界。', avatarKey: 'lin' },
    ],
    '社牛怪': [
      { name: '郭德纲', role: '相声演员', quote: '快乐是本事，让别人快乐是水平。', avatarKey: 'guo' },
      { name: '成龙', role: '演员 · 功夫明星', quote: '我不要做第一，我要做唯一。', avatarKey: 'jackie' },
    ],
    '精神小伙': [
      { name: '项羽', role: '西楚霸王', quote: '力拔山兮气盖世，时不利兮骓不逝。', avatarKey: 'xiangyu' },
      { name: '霍去病', role: '汉代名将', quote: '匈奴未灭，何以家为？', avatarKey: 'huo' },
    ],
    '养生达人': [
      { name: '钟南山', role: '医学专家 · 院士', quote: '健康是人生最大的财富。', avatarKey: 'zhong' },
      { name: '彭祖', role: '传说中的长寿之人', quote: '食不过饱，饮不过量。', avatarKey: 'pengzu' },
    ],
    'emo诗人': [
      { name: '顾城', role: '当代诗人', quote: '黑夜给了我黑色的眼睛，我却用它寻找光明。', avatarKey: 'gucheng' },
      { name: '席慕蓉', role: '诗人 · 画家', quote: '那时候，不知道为什么，总是哭。', avatarKey: 'xi' },
    ],
    '卷王本王': [
      { name: '曾国藩', role: '清代政治家 · 军事家', quote: '自胜者强，自强者胜。', avatarKey: 'zeng' },
      { name: '马云', role: '阿里巴巴创始人', quote: '今天很残酷，明天更残酷，后天很美好，但大多数人死在明天晚上。', avatarKey: 'mayun' },
    ],
    '显眼包': [
      { name: '金星', role: '舞蹈家 · 节目主持人', quote: '我就是我，颜色不一样的烟火。', avatarKey: 'jinxing' },
      { name: '蔡明', role: '喜剧演员', quote: '有我就有欢乐！', avatarKey: 'caiming' },
    ],
    '老好人': [
      { name: '雷锋', role: '解放军战士 · 道德模范', quote: '把有限的生命投入到无限的为人民服务中去。', avatarKey: 'leifeng' },
      { name: '孔子', role: '儒家思想创始人', quote: '己所不欲，勿施于人。', avatarKey: 'kongzi' },
    ],
    '独行侠': [
      { name: '尼采', role: '德国哲学家', quote: '每一个不曾起舞的日子，都是对生命的辜负。', avatarKey: 'nietzsche' },
      { name: '列奥纳多·达芬奇', role: '艺术家 · 科学家', quote: '简洁是最终的精致。', avatarKey: 'davinci' },
    ],
  },

  color: {
    R: [
      { name: '拿破仑·波拿巴', role: '法国皇帝 · 军事天才', quote: '不想当将军的士兵不是好士兵。', avatarKey: 'napoleon' },
      { name: '史蒂夫·乔布斯', role: '苹果公司创始人', quote: '领导者与追随者的区别在于创新。', avatarKey: 'jobs' },
    ],
    B: [
      { name: '比尔·盖茨', role: '微软联合创始人', quote: '智慧胜于蛮力。', avatarKey: 'bill_gates' },
      { name: '沃伦·巴菲特', role: '投资大师', quote: '如果你不愿持有一只股票十年，就不要持有它十分钟。', avatarKey: 'buffett' },
    ],
    Y: [
      { name: '罗宾·威廉姆斯', role: '演员 · 喜剧演员', quote: '笑声是两人之间最短的距离。', avatarKey: 'robin_williams' },
      { name: '莫扎特', role: '古典音乐作曲家', quote: '音乐是心灵的语言，它能触及文字无法抵达的地方。', avatarKey: 'mozart' },
    ],
    G: [
      { name: '特蕾莎修女', role: '诺贝尔和平奖得主', quote: '爱不是爱大事，而是用爱心做小事。', avatarKey: 'mother_teresa' },
      { name: '巴拉克·奥巴马', role: '美国第44任总统', quote: '变化的力量来自于一起工作的人们。', avatarKey: 'obama' },
    ],
  },

  attach: {
    secure: [
      { name: '达赖喇嘛', role: '藏传佛教领袖', quote: '给予快乐，接受爱，这就是全部。', avatarKey: 'dalai' },
      { name: '米歇尔·奥巴马', role: '美国前第一夫人', quote: '当他们往低处走，我们往高处走。', avatarKey: 'michelle' },
    ],
    anxious: [
      { name: '伍迪·艾伦', role: '导演 · 演员', quote: '我的焦虑让我很焦虑。', avatarKey: 'woody_allen' },
      { name: '卡夫卡', role: '小说家', quote: '在爱中，我们看到了自己的弱点。', avatarKey: 'kafka' },
    ],
    avoidant: [
      { name: '艾米丽·狄金森', role: '诗人', quote: '我是没有人，你是谁？', avatarKey: 'dickinson' },
      { name: '爱因斯坦', role: '理论物理学家', quote: '我宁愿独处，也不愿在浮浅的交往中消耗自己。', avatarKey: 'einstein' },
    ],
    fearful: [
      { name: '弗吉尼亚·伍尔夫', role: '作家 · 现代主义先驱', quote: '你必须先爱自己，才能爱别人。', avatarKey: 'woolf' },
      { name: '阿加莎·克里斯蒂', role: '侦探小说女王', quote: '没有什么比人类心理更神秘的了。', avatarKey: 'christie' },
    ],
  },

  enneagram: {
    1: [
      { name: '圣雄甘地', role: '印度独立运动领袖', quote: '成为你希望在世界上看到的那种改变。', avatarKey: 'gandhi' },
      { name: '纳尔逊·曼德拉', role: '南非总统', quote: '除非是我本人放弃，否则没有人能征服我。', avatarKey: 'mandela' },
    ],
    2: [
      { name: '特蕾莎修女', role: '慈善家', quote: '如果你评判他人，你就没有时间去爱他们。', avatarKey: 'mother_teresa' },
      { name: '戴安娜王妃', role: '英国王妃', quote: '带走这颗破碎的心，给它爱，它就会复活。', avatarKey: 'diana' },
    ],
    3: [
      { name: '欧普拉·温弗瑞', role: '媒体大亨', quote: '你成为今天的你，是你过去每一个选择的结果。', avatarKey: 'oprah' },
      { name: '泰勒·斯威夫特', role: '歌手', quote: '我只是个追逐梦想的普通人。', avatarKey: 'taylor_swift' },
    ],
    4: [
      { name: '弗里达·卡罗', role: '画家', quote: '我画自己，因为我是我最了解的主题。', avatarKey: 'frida' },
      { name: '约翰尼·德普', role: '演员', quote: '我自己就是一件艺术品。', avatarKey: 'depp' },
    ],
    5: [
      { name: '阿尔伯特·爱因斯坦', role: '理论物理学家', quote: '我没有特殊的才能，我只是强烈地充满了好奇心。', avatarKey: 'einstein' },
      { name: '斯蒂芬·霍金', role: '宇宙学家', quote: '生命无论多么艰难，总有你能做和成功的事情。', avatarKey: 'hawking' },
    ],
    6: [
      { name: '乔治·华盛顿', role: '美国第一任总统', quote: '诚实是最好的政策。', avatarKey: 'washington' },
      { name: '约翰·列侬', role: '披头士乐队', quote: '生命就是你忙着做其他计划时发生的一切。', avatarKey: 'lennon' },
    ],
    7: [
      { name: '罗宾·威廉姆斯', role: '演员 · 喜剧演员', quote: '你只有一次生命，但如果你做对了，一次就够了。', avatarKey: 'robin_williams' },
      { name: '莫扎特', role: '古典音乐作曲家', quote: '音乐不在于音符，而在于音符之间的空隙。', avatarKey: 'mozart' },
    ],
    8: [
      { name: '马丁·路德·金', role: '民权运动领袖', quote: '我们必须接受失望，因为它是有限的；但绝不能失去希望，因为它是无限的。', avatarKey: 'mlk' },
      { name: '弗兰克林·罗斯福', role: '美国第32任总统', quote: '唯一值得恐惧的是恐惧本身。', avatarKey: 'fdr' },
    ],
    9: [
      { name: '达赖喇嘛', role: '藏传佛教领袖', quote: '平静不是远离问题，而是面对问题时内心的宁静。', avatarKey: 'dalai' },
      { name: '亚伯拉罕·林肯', role: '美国第16任总统', quote: '重要的不是你活了多少年，而是你的年华中注入了多少生命。', avatarKey: 'lincoln' },
    ],
  },

  holland: {
    R: [{ name: '詹姆斯·瓦特', role: '蒸汽机发明家', quote: '简单是复杂的终极形式。', avatarKey: 'watt' }],
    I: [{ name: '居里夫人', role: '诺贝尔物理学及化学奖得主', quote: '人生中没有什么可怕的，只有需要理解的。', avatarKey: 'curie' }],
    A: [{ name: '列奥纳多·达芬奇', role: '艺术家 · 发明家', quote: '简洁是最终的精致。', avatarKey: 'davinci' }],
    S: [{ name: '弗洛伦斯·南丁格尔', role: '现代护理学创始人', quote: '不论去往何处，带上你的爱心。', avatarKey: 'nightingale' }],
    E: [{ name: '理查德·布兰森', role: '维珍集团创始人', quote: '如果有人提供你一个绝佳机会，就答应他，然后再学会怎么做。', avatarKey: 'branson' }],
    C: [{ name: '彼得·德鲁克', role: '管理学之父', quote: '效率是正确地做事，效能是做正确的事。', avatarKey: 'drucker' }],
  },

  ocean: {
    default: [
      { name: '卡尔·荣格', role: '分析心理学创始人', quote: '了解自己是最难的功课，也是最重要的功课。', avatarKey: 'jung' },
      { name: '西格蒙德·弗洛伊德', role: '精神分析学创始人', quote: '无意识是所有心理活动的真正基础。', avatarKey: 'freud' },
    ],
  },

  love: {
    default: [
      { name: '简·奥斯汀', role: '英国小说家', quote: '一个人必须先爱自己，才能真正爱别人。', avatarKey: 'austen' },
      { name: '鲁米', role: '苏菲派诗人', quote: '你是爱，你是爱者，你是爱的本身。', avatarKey: 'rumi' },
    ],
  },

  eq: {
    default: [
      { name: '丹尼尔·戈尔曼', role: '情商理论创立者', quote: '情感的成熟，不是不感受，而是更明智地感受。', avatarKey: 'goleman' },
      { name: '达赖喇嘛', role: '藏传佛教领袖', quote: '内心的平静是真正的力量。', avatarKey: 'dalai' },
    ],
  },
};

function getCelebrities(testId, resultKey) {
  const testMap = CELEBRITIES[testId];
  if (!testMap) return [];
  return testMap[resultKey] || testMap['default'] || [];
}

module.exports = { CELEBRITIES, getCelebrities };
