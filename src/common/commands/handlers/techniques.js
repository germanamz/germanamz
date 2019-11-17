
function techniques(...args) {

}

module.exports = {
  handler: techniques,
  hints: [
    'who are you?',
    'tell me about your self',
  ],
  patterns: [
    new RegExp('^who are you', 'i'),
    new RegExp('^tell me about your self', 'i'),
  ],
};
