const { updateGroup, getGroup } = require('../../../http/api-groups');
const { checkUser } = require('../../../http/api-users');
const { isBotAdmin } = require('../../../utils/isBotAdmin');
const chat = require('./chat');

module.exports = async function workCommand(bot, msg, args) {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;

  if (msg.chat.type === 'private') return;

  try {
    const isAdmin = await isBotAdmin(bot, chat_id);
    if (!isAdmin)
      return await bot.sendMessage(chat_id, `Права администратора отсутствуют`);

    const user = await checkUser(user_id);
    if (!user)
      return await bot.sendMessage(chat_id, `У вас нет доступа к этой команде`);

    const group = await getGroup(user_id, chat_id);
    if (!group) return await bot.sendMessage(chat_id, `Чат отсутствует`);

    if (group?.status === 'ACTIVE')
      return await bot.sendMessage(chat_id, `Чат уже активирован`);
    if (group?.status === 'WORK')
      return await bot.sendMessage(chat_id, `Чат уже в работе`);

    const body = {
      work_at: Number(Date.now() / 1000),
      status: 'WORK',
    };
    const newGroup = await updateGroup(user_id, chat_id, body);
    await bot.sendMessage(chat_id, 'Чат в работе.');
  } catch (e) {
    console.log(e?.response?.data);
  }
};
