const { createGroup, getGroup } = require('../../../http/api-groups');
const { checkUser } = require('../../../http/api-users');
const { isBotAdmin } = require('../../../utils/isBotAdmin');

module.exports = async function createCommand(bot, msg, args) {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;

  if (msg.chat.type === 'private') return;

  try {
    const isAdmin = await isBotAdmin(bot, chat_id);
    if (!isAdmin)
      return await bot.sendMessage(
        chat_id,
        `Права администратора отсутствуют`
      );

    const user = await checkUser(user_id);
    if (!user)
      return await bot.sendMessage(
        chat_id,
        `У вас нет доступа к этой команде`
      );

    const group = await getGroup(user_id, chat_id);
    console.log(group);

    if (group)
      return await bot.sendMessage(chat_id, `Чат уже существует: ${chat_id}`);

    const chat_url = await bot.exportChatInviteLink(chat_id);

    const body = {
      title: msg.chat.title,
      chat_id,
      chat_url,
      type: msg.chat.type,
    };
    const newGroup = await createGroup(user_id, body);

    if (newGroup)
      return await bot.sendMessage(chat_id, `Чат создан: ${chat_id}`);
  } catch (e) {
    console.log(e);
    await bot.sendMessage(chat_id, `Произошла ошибка.`);
  }
};
