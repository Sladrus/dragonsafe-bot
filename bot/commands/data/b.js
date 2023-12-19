const { evaluate } = require('mathjs');
const {
  getBalances,
  updateBalances,
  deleteBalances,
} = require('../../../http/api-balances');
const { getGroup } = require('../../../http/api-groups');
const { defaultCurrencies } = require('../../../utils/consts');
const { isBotAdmin } = require('../../../utils/isBotAdmin');
const { currencyFormatter } = require('../../../utils/currencyFormatter');
const { checkUser } = require('../../../http/api-users');

function validateEvent(arg0, arg1) {
  const events = ['SP', 'IN', 'OUT', 'DEL', 'ADV'];
  const event = events.includes(arg0.toUpperCase()) ? arg0.toLowerCase() : null;
  if (event) {
    const currency = arg1.toUpperCase();
    return defaultCurrencies.includes(currency)
      ? [event, currency]
      : [null, null];
  }
  const currency = arg0.toUpperCase();
  return defaultCurrencies.includes(currency) ? [null, currency] : [null, null];
}

const validateArgs = (args) => {
  console.log(args);
  try {
    const [event, currency] = validateEvent(args[0], args[1]);
    console.log(event, currency);
    const currencyIndex = event ? 2 : 1;
    const expression = args[currencyIndex];
    const comment =
      args.slice(currencyIndex + 1, args.length).join(' ') || null;
    const regex = /^[+\-/*]/;

    if (regex.test(comment)) {
      return [null, null, null, null];
    } else {
    }
    return [event, currency, evaluate(expression), comment];
  } catch (e) {
    return [null, null, null, null];
  }
};

const setBalance = async (bot, msg, args) => {
  const [event, currency, value, comment] = validateArgs(args);
  if (isNaN(Number(value))) {
    return await bot.sendMessage(
      msg.chat.id,
      `Произошла ошибка! Проверьте правильность ввода команды/валюты`
    );
  }
  if (currency === null || value === undefined)
    return await bot.sendMessage(
      msg.chat.id,
      `Произошла ошибка! Проверьте правильность ввода команды/валюты`
    );
  const balance = await updateBalances(msg.from.id, msg.chat.id, {
    event,
    currency,
    value,
    comment,
    from: msg.from,
  });
  if (!balance)
    return await bot.sendMessage(
      msg.chat.id,
      `С валютой ${currency} не работаем.\n\nДоступны следующие валюты для ввода/вывода с баланса:\n`
    );
  if (balance === undefined) return;
  console.log(balance);
  await bot.sendMessage(
    msg.chat.id,
    `<b>Запомнил ${currencyFormatter(
      currency,
      value
    )}</b>\nБаланс <b>${balance.currency?.toUpperCase()}:</b> ${currencyFormatter(
      balance.currency,
      balance.amount
    )}`,
    { parse_mode: 'HTML' }
  );
};

const showBalance = async (bot, user_id, chat_id) => {
  const balances = await getBalances(user_id, chat_id);
  if (!balances) return await bot.sendMessage(msg.chat.id, `Произошла ошибка`);

  let message = '';
  balances.forEach((balance) => {
    message += `<b>${balance.currency.toUpperCase()}:</b> ${currencyFormatter(
      balance.currency,
      balance.amount
    )}\n`;
  });
  await bot.sendMessage(
    chat_id,
    balances.length > 0
      ? `Баланс:\n${message}`
      : `Балансы пустые. Используйте /b «валюта» «сумма» «комментарий»`,
    { parse_mode: 'HTML' }
  );
};

const delBalance = async (bot, msg, args) => {
  const [event, currency] = validateEvent(args[0], args[1]);
  if (currency === null)
    return await bot.sendMessage(
      msg.chat.id,
      `Произошла ошибка! Такая валюта не принимается/!`,
      { parse_mode: 'HTML' }
    );
  const balance = await deleteBalances(msg.from.id, msg.chat.id, {
    from: msg.from,
    currency,
    event,
  });
  console.log(balance);
  if (balance === undefined) return;
  await bot.sendMessage(
    msg.chat.id,
    `Баланс <b>${currency.toUpperCase()}</b> очищен`,
    { parse_mode: 'HTML' }
  );
};

module.exports = async function balanceCommand(bot, msg, args) {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;

  if (args['=ERRORS'].length) return;
  if (msg.chat.type === 'private') return;

  try {
    const isAdmin = await isBotAdmin(bot, chat_id);
    if (!isAdmin)
      return await bot.sendMessage(chat_id, `Права администратора отсутствуют`);

    const user = await checkUser(user_id);
    if (!user)
      return await bot.sendMessage(chat_id, `У вас нет доступа к этой команде`);

    const group = await getGroup(user_id, chat_id);
    if (!group) return await bot.sendMessage(chat_id, `Чат отсутствует`);

    if (group?.status !== 'ACTIVE')
      return await bot.sendMessage(
        chat_id,
        `Актиивруйте чат с помощью /active`
      );

    if (args.length === 0) return await showBalance(bot, user_id, chat_id);
    if (args.length >= 2)
      return args[0].toUpperCase() === 'DEL'
        ? await delBalance(bot, msg, args)
        : await setBalance(bot, msg, args);
    return await bot.sendMessage(
      chat_id,
      `Произошла ошибка! Проверьте правильность ввода команды/валюты`
    );
  } catch (e) {
    console.log(e);
    await bot.sendMessage(chat_id, `Произошла ошибка`);
  }
};
