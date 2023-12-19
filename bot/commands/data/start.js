module.exports = async function startCommand(bot, msg, args) {
  const chat_id = msg.chat.id;

  if (msg.chat.type !== 'private') return;

  try {
    await bot.sendMessage(
      chat_id,
      'Привет, я бот Бухгалтер.\n\nСо мной вы можете:\n\n<b>- Узнать текущий курс валют.</b>\nПары доступны для всех валют, которые поддерживает биржа XE, а валютные пары с рублем берутся с биржи MOEX. Например, чтобы узнать курс USD к RUB введите команду /usdrub.\n\n<b>- Посчитать любое выражение прямо в вашем поле ввода сообщения</b>\nБот @dragonsafe_bot работает как калькулятор. Это inline bot. Например, если написать @dragonsafe_bot (100-15%)/20, то получите результат расчетов сразу в диалог, попробуйте!\n\n✨🔐 Для доступа к закрытым командам бота введите /key {ключ активации}.',
      {
        parse_mode: 'HTML',
      }
    );
  } catch (e) {
    console.log(e?.response?.data);
  }
};

// reply_markup: JSON.stringify({
//     inline_keyboard: [
//       [{ text: 'Some button text 1', callback_data: '1' }],
//     ],
//   }),
