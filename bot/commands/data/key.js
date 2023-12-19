const { activateUser } = require('../../../http/api-users');

module.exports = async function keyCommand(bot, msg, args) {
  const user_id = msg.from.id;

  if (msg.chat.type !== 'private') return;
  if (args.length === 0)
    return await bot.sendMessage(user_id, `Ключ отсутствует`);

  try {
    const body = { key: args[0], from: msg.from };
    const user = await activateUser(user_id, body);
    if (!user)
      return await bot.sendMessage(
        user_id,
        `❌ Введенный ключ активации не подтвержден.\nОбратитесь за помощью к человеку, который выдал вам ключ`
      );
    await bot.sendMessage(
      user_id,
      `✅ Введенный ключ активации подтвержден.\nВам предоставлен доступ к боту`
    );
  } catch (e) {
    console.log(e);
    await bot.sendMessage(chat_id, `Произошла ошибка`);
  }
};
