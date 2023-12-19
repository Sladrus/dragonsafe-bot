const { updateGroup, getGroup } = require('../../../http/api-groups');

module.exports = async function migrateToChatId(bot, msg) {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;
  const new_chat_id = msg.migrate_to_chat_id;

  try {
    const group = await getGroup(user_id, chat_id);
    if (!group) return;

    const body = { chat_id: new_chat_id, type: 'supergroup' };
    const newGroup = await updateGroup(user_id, chat_id, body);
    return await bot.sendMessage(new_chat_id, `Чат стал супергруппой.`);
  } catch (e) {
    console.log(e);
  }
};
