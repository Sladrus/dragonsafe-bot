const Command = require('telegram-command-handler');

const initCommand = async (bot, name) => {
  const commandName = new Command(bot, name);
  const commandPath = './data/' + name;

  const callback = require(commandPath);

  commandName.on('receive', async (msg, args) => {
    await callback(bot, msg, args);
  });
};

const initCommands = async (bot) => {
  await initCommand(bot, 'b');
  await initCommand(bot, 'chatid');
  await initCommand(bot, 'create');
  await initCommand(bot, 'active');
  await initCommand(bot, 'key');
  await initCommand(bot, 'start');
  await initCommand(bot, 'chat');
  await initCommand(bot, 'work');
  await initCommand(bot, 'help');
  await initCommand(bot, 'menu');
  await initCommand(bot, 'review');
  await initCommand(bot, 'trust');
  await initCommand(bot, 'timetaken');
  await initCommand(bot, 'fees');
  await initCommand(bot, 'example');
  await initCommand(bot, 'howcreatetask');
  await initCommand(bot, 'tech');

};

module.exports = { initCommands };
