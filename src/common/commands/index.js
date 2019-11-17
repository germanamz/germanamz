const commands = require('./commands');

function matchOne(command, text) {
  const patterns = [ ...command.patterns ];
  let pattern = patterns.pop();
  while (command) {
    const matched = text.match(pattern);
    if (matched) {
      return matched;
    }
    pattern = patterns.pop();
  }
  return null;
}

export function match(text) {
  return commands.filter(command => !!matchOne(command, text));
}

export function find(text) {
  let matchedData;
  const findedCommand = commands.find((command) => {
    const matched = matchOne(command, text);
    if (matched) {
      matchedData = matched;
      return true;
    }
    return false;
  });
  if (!findedCommand) {
    return null;
  }
  return {
    command: findedCommand,
    matched: matchedData,
  };
}

export async function exec({ command, args }) {
  return command.handler(...args);
}

export async function execByText(text) {
  return exec(find(text));
}
