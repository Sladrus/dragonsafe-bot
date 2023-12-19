module.exports = async function myChatmemberEvent(bot, msg, args) {
  const chat_id = msg.chat.id;
  const status = msg.new_chat_member.status;

  console.log(msg);
  if (!msg.new_chat_member.user.is_bot) return;

  try {
    if (status === 'administrator') {
      return await bot.sendMessage(chat_id, `Права администратора получены.`);
    }
    // if (status === 'member') {
    //   return await bot.sendMessage(
    //     chat_id,
    //     `Права администратора отсутствуют.`
    //   );
    // }
  } catch (e) {
    console.log(e?.response?.data);
  }
};
