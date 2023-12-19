const initEvent = (bot, name) => {
  const eventPath = './data/' + name;
  const callback = require(eventPath);

  bot.on(name, async (message) => {
    await callback(bot, message);
  });
};

const initEvents = (bot) => {
  initEvent(bot, 'new_chat_title');
  initEvent(bot, 'left_chat_member');
  initEvent(bot, 'new_chat_members');
  initEvent(bot, 'chat_member');

  initEvent(bot, 'migrate_to_chat_id');
  initEvent(bot, 'my_chat_member');

  initEvent(bot, 'text');
  initEvent(bot, 'voice');
  initEvent(bot, 'inline_query');

  initEvent(bot, 'polling_error');
  initEvent(bot, 'error');
};

module.exports = { initEvents };
