
function experience() {

}

module.exports = {
  handler: experience,
  hints: [
    'show me your experience',
    'what\' your experience"',
  ],
  patterns: [
    new RegExp('^show me your experience', 'i'),
    new RegExp('^what\'?s your experience', 'i'),
  ],
};
