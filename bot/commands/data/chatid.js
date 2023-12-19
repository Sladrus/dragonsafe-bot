module.exports = async function chatIdCommand(bot, msg, args) {
  const chat_id = msg.chat.id;

  if (msg.chat.type === 'private') return;

  try {
    await bot.sendMessage(chat_id, `ChatId: \`${chat_id}\``, {
      parse_mode: 'Markdown',
    });
  } catch (e) {
    console.log(e?.response?.data);
  }
};
