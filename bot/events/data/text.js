const { createLog } = require('../../../http/api-logs');
const { isBotAdmin } = require('../../../utils/isBotAdmin');

module.exports = async function textEvent(bot, msg) {
  const user_id = msg.from.id;
  const chat_id = msg.chat.id;

  try {
    const isAdmin = await isBotAdmin(bot, chat_id);
    if (!isAdmin) return;

    const log = await createLog(user_id, msg);
  } catch (e) {
    // console.log(e);
  }
};
