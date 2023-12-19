const { getCmdMessages } = require('../../../http/api-command');
const { getGroup, updateGroup } = require('../../../http/api-groups');
const { checkUser } = require('../../../http/api-users');

module.exports = async function newChatMemberEvent(bot, msg) {
  const chat_id = msg.chat.id;
  const user_id = msg.new_chat_member.id;

  if (
    msg.new_chat_member.status !== 'member' &&
    msg.old_chat_member.status !== 'left'
  )
    return;

  try {
    const user = await checkUser(user_id);
    if (user) return;

    const group = await getGroup(user_id, chat_id);
    if (!group) return;

    if (group.status !== 'ACTIVE' && group.status !== 'WORK') {
      const body = {
        status: 'WORK',
        work_at: Number(Date.now() / 1000),
      };
      const newGroup = await updateGroup(user_id, chat_id, body);
      if (!newGroup) return;
    }

    const data = await getCmdMessages('join', user_id, chat_id);
    if (!data) return;

    const { answers } = data;
    for (const answer of answers) {
      await bot.sendMessage(chat_id, answer, {
        parse_mode: 'HTML',
      });
    }
  } catch (e) {
    console.log(e);
  }
};
