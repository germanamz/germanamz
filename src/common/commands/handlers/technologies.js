
function technologies(...args) {

}

module.exports = {
  handler: technologies,
  hints: [
    'who are you?',
    'tell me about your self',
  ],
  patterns: [
    new RegExp('^who are you', 'i'),
    new RegExp('^tell me about your self', 'i'),
  ],
};
