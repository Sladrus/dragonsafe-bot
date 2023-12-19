const { isBotAdmin } = require('../../../utils/isBotAdmin');
const { updateGroup, getGroup } = require('../../../http/api-groups');
const { checkUser } = require('../../../http/api-users');

module.exports = async function activeCommand(bot, msg, args) {
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
    if (!group)
      return await bot.sendMessage(chat_id, `Чат отсутствует: ${chat_id}`);

    if (group?.status === 'ACTIVE')
      return await bot.sendMessage(chat_id, `Чат уже активирован`);

    const body = {
      status: 'ACTIVE',
      activated_at: Number(Date.now() / 1000),
    };
    const newGroup = await updateGroup(user_id, chat_id, body);
    return await bot.sendMessage(chat_id, `Чат активирован`);
  } catch (e) {
    console.log(e);
    await bot.sendMessage(chat_id, `Произошла ошибка`);
  }
};
