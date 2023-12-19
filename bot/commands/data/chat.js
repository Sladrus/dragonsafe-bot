const { getEmptyGroup } = require('../../../http/api-groups');
const { checkUser } = require('../../../http/api-users');

module.exports = async function chatCommand(bot, msg, args) {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;

  try {
    const user = await checkUser(user_id);
    if (!user)
      return await bot.sendMessage(
        chat_id,
        `У вас нет доступа к этой команде`
      );

    const chat = await getEmptyGroup(user_id);
    if (!chat)
      return await bot.sendMessage(chat_id, `Свободные чаты закончились`);

    await bot.sendMessage(
      chat_id,
      `Chat ID: <b>${chat.chat_id}</b>\n👉 Ссылка на чат: <b>${chat?.chat_url}</b>`,
      { parse_mode: 'HTML', disable_web_page_preview: true }
    );
  } catch (e) {
    console.log(e);
  }
};
