const { getGroup, updateGroup } = require('../../../http/api-groups');

module.exports = async function newTitleEvent(bot, msg) {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;
  const new_chat_title = msg.new_chat_title;

  try {
    const group = await getGroup(user_id, chat_id);
    if (!group) return;

    const body = { title: new_chat_title };
    const newGroup = await updateGroup(user_id, chat_id, body);
  } catch (e) {
    console.log(e);
  }
};
