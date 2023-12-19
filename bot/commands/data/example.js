const { getCmdMessages } = require('../../../http/api-command');

module.exports = async function exampleCommand(bot, msg, args) {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;

  if (msg.chat.type === 'private') return;

  try {
    const data = await getCmdMessages('example', user_id, chat_id);
    if (!data) return;
    const { answers } = data;
    for (const answer of answers) {
      await bot.sendMessage(chat_id, answer, {
        parse_mode: 'HTML',
      });
    }
  } catch (e) {
    console.log(e?.response?.data);
  }
};
