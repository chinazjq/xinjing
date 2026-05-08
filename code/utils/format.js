// 通用格式化

function pad2(n) {
  return n < 10 ? '0' + n : '' + n;
}

function formatDate(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}.${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}`;
}

function formatTime(ts) {
  const d = new Date(ts);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function formatDateTime(ts) {
  return `${formatDate(ts)} ${formatTime(ts)}`;
}

function relativeTime(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return '刚刚';
  if (m < 60) return `${m}分钟前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}小时前`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}天前`;
  return formatDate(ts);
}

module.exports = { formatDate, formatTime, formatDateTime, relativeTime, pad2 };
