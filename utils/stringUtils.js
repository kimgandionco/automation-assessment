function appendTimestamp(base) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${base}-${timestamp}`;
}
  
module.exports = { appendTimestamp };
  