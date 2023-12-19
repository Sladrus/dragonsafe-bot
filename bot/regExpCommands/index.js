const initRegExpCommand = (bot, name, regExp) => {
  const commandPath = './data/' + name;
  const callback = require(commandPath);

  bot.onText(regExp, async function (msg, match) {
    await callback(bot, msg, match);
  });
};

const initRegExpCommands = (bot) => {
  initRegExpCommand(bot, 'currency', /^\/([a-z]{3}[a-z]{3})(\s+.+)?$/);
  //   initRegExpCommand(bot, '', /^\/[a-z]{6}[ ]?\d*([+\-*\/]\d+|\d*[.,]?\d+)*%?/);
};

module.exports = { initRegExpCommands };
