// 评分工具集

function scoreMBTI(questions, answers) {
  const dims = { EI: 0, SN: 0, TF: 0, JP: 0 };
  questions.forEach((q, i) => {
    const ans = answers[i];
    if (ans === 'a') dims[q.d] += 1;
    else if (ans === 'b') dims[q.d] -= 1;
  });
  const type =
    (dims.EI >= 0 ? 'E' : 'I') +
    (dims.SN >= 0 ? 'S' : 'N') +
    (dims.TF >= 0 ? 'T' : 'F') +
    (dims.JP >= 0 ? 'J' : 'P');
  return { type, dims };
}

const SBTI_LEVEL_VALUE = { L: 1, M: 2, H: 3 };

function sbtiLevel(avg) {
  if (avg <= 1.67) return 'L';
  if (avg <= 2.34) return 'M';
  return 'H';
}

function flattenSbtiPattern(pattern) {
  return String(pattern || '').replace(/-/g, '').split('');
}

function scoreSBTIPattern(questions, answers) {
  const order = questions.DIMENSION_ORDER || [];
  const patterns = questions.TYPE_PATTERNS || [];
  const fallbackType = questions.FALLBACK_TYPE || 'HHHH';
  const drunkType = questions.DRUNK_TYPE || 'DRUNK';
  const drunkTriggerQuestionId = questions.DRUNK_TRIGGER_QUESTION_ID || 'drink_gate_q2';
  const sums = {};
  const counts = {};
  let drunkTriggered = false;

  questions.forEach((q, i) => {
    const opt = q.opts && q.opts[answers[i]];
    const value = opt ? Number(opt.value) : 2;
    if (q.special) {
      if (q.id === drunkTriggerQuestionId && value === 2) drunkTriggered = true;
      return;
    }
    if (!q.dim) return;
    sums[q.dim] = (sums[q.dim] || 0) + value;
    counts[q.dim] = (counts[q.dim] || 0) + 1;
  });

  const dimensions = {};
  const dimensionLevels = {};
  order.forEach((dim) => {
    const avg = counts[dim] ? sums[dim] / counts[dim] : 2;
    dimensions[dim] = +avg.toFixed(2);
    dimensionLevels[dim] = sbtiLevel(avg);
  });

  const userFlat = order.map(dim => dimensionLevels[dim] || 'M');
  const pattern = userFlat.reduce((chunks, value, index) => {
    if (index % 3 === 0) chunks.push('');
    chunks[chunks.length - 1] += value;
    return chunks;
  }, []).join('-');

  if (drunkTriggered) {
    return { type: drunkType, sourceType: drunkType, pattern, similarity: 100, exact: order.length, dimensions, dimensionLevels, special: 'drink_trigger' };
  }

  let best = null;
  patterns.forEach((item) => {
    const target = flattenSbtiPattern(item.pattern);
    let distance = 0;
    let exact = 0;
    userFlat.forEach((level, index) => {
      if (level === target[index]) exact += 1;
      distance += Math.abs((SBTI_LEVEL_VALUE[level] || 2) - (SBTI_LEVEL_VALUE[target[index]] || 2));
    });
    const similarity = Math.max(0, Math.round((1 - distance / (order.length * 2)) * 100));
    if (!best || similarity > best.similarity || (similarity === best.similarity && exact > best.exact)) {
      best = { ...item, similarity, exact };
    }
  });

  if (!best || best.similarity < 60) {
    return { type: fallbackType, sourceType: fallbackType, pattern, similarity: best ? best.similarity : 0, exact: best ? best.exact : 0, dimensions, dimensionLevels, nearest: best && best.type };
  }

  return { type: best.type, sourceType: best.sourceCode || best.type, pattern, similarity: best.similarity, exact: best.exact, dimensions, dimensionLevels };
}

function scoreSBTI(questions, answers) {
  if (questions && questions.TYPE_PATTERNS && questions.DIMENSION_ORDER) {
    return scoreSBTIPattern(questions, answers);
  }

  const counts = {};
  questions.forEach((q, i) => {
    const opt = q.opts[answers[i]];
    if (!opt) return;
    counts[opt.type] = (counts[opt.type] || 0) + 1;
  });
  let top = null;
  let max = -1;
  Object.keys(counts).forEach((k) => {
    if (counts[k] > max) {
      max = counts[k];
      top = k;
    }
  });
  return { type: top, counts };
}

function scoreColor(questions, answers) {
  const counts = { R: 0, B: 0, Y: 0, G: 0 };
  questions.forEach((q, i) => {
    const opt = q.opts[answers[i]];
    if (!opt) return;
    counts[opt.c] = (counts[opt.c] || 0) + 1;
  });
  let main = 'R';
  Object.keys(counts).forEach((k) => {
    if (counts[k] > counts[main]) main = k;
  });
  const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  return { main, sub: sorted[1], counts };
}

function likertValue(raw, reverse) {
  return reverse ? 6 - raw : raw;
}

function scoreLikertDim(questions, answers) {
  const dims = {};
  const counts = {};
  questions.forEach((q, i) => {
    const raw = Number(answers[i]) || 3;
    const v = likertValue(raw, q.r);
    dims[q.dim] = (dims[q.dim] || 0) + v;
    counts[q.dim] = (counts[q.dim] || 0) + 1;
  });
  const avg = {};
  Object.keys(dims).forEach((k) => {
    avg[k] = +(dims[k] / counts[k]).toFixed(2);
  });
  return { dims, avg, counts };
}

function scoreLikertTotal(questions, answers) {
  let total = 0;
  questions.forEach((q, i) => {
    const raw = Number(answers[i]) || 3;
    total += likertValue(raw, q.r);
  });
  const avg = +(total / questions.length).toFixed(2);
  return { total, avg, max: questions.length * 5 };
}

// 九型 / 霍兰德：a/b 分别映射到某类型
function scoreTwoWay(questions, answers) {
  const counts = {};
  questions.forEach((q, i) => {
    const ans = answers[i];
    const t = ans === 'a' ? q.ta : ans === 'b' ? q.tb : null;
    if (t === null) return;
    counts[t] = (counts[t] || 0) + 1;
  });
  const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  return { main: sorted[0], sub: sorted[1], counts, top3: sorted.slice(0, 3) };
}

// 依恋风格四分类
function scoreAttach(questions, answers) {
  const res = scoreLikertDim(questions, answers);
  const a = res.avg.A || 3;
  const v = res.avg.V || 3;
  const highA = a >= 3;
  const highV = v >= 3;
  let style;
  if (!highA && !highV) style = 'secure';
  else if (highA && !highV) style = 'anxious';
  else if (!highA && highV) style = 'avoidant';
  else style = 'fearful';
  return { style, A: a, V: v, dims: res.dims };
}

module.exports = {
  scoreMBTI,
  scoreSBTI,
  scoreColor,
  scoreLikertDim,
  scoreLikertTotal,
  scoreTwoWay,
  scoreAttach,
};
