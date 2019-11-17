const handlers = require('./handlers');

const commands = [
  handlers.experience,
  handlers.whoami,
  handlers.projects,
  handlers.techniques,
  handlers.technologies,
];

module.exports = commands;
