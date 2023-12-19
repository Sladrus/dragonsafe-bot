const { evaluate } = require('mathjs');
const {
  convertCurrencyMoex,
  convertCurrencyXe,
} = require('../../../http/api-currency');
const { isCurrencyValue } = require('../../../utils/isCurrencyValue');
const { isMoexPair } = require('../../../utils/isMoexPair');
const { random } = require('../../../utils/random');
const { getEmojiByCurrencyCode } = require('country-currency-emoji-flags');
const { splitInHalf } = require('../../../utils/splitOnHalf');

const calculateRealAmount = (course, fakeAmount, amount = 1) => {
  return ((course / fakeAmount) * evaluate(amount.toString())).toFixed(4);
};

module.exports = async function currencyCommand(bot, msg, match) {
  const chat_id = msg.chat.id;

  const [from, to] = splitInHalf(match[1]);
  const amount = match[2];
  if (!isCurrencyValue(from) || !isCurrencyValue(to)) return;

  const { message_id } = await bot.sendMessage(
    chat_id,
    `💱 Получаем данные...`
  );

  try {
    const type = isMoexPair(from + to) ? 'MOEX' : 'XE';
    const fakeAmount = random(1000, 100000);

    const fakeCourse =
      type === 'MOEX'
        ? await convertCurrencyMoex(from, to, fakeAmount)
        : await convertCurrencyXe(from, to, fakeAmount);
    if (!fakeCourse)
      return await bot.editMessageText(
        `Произошла ошибка! Проверьте правильность ввода команды.`,
        {
          chat_id,
          message_id,
        }
      );

    const course = Number(fakeCourse.course.split(' ')[0]);
    const realAmount = calculateRealAmount(course, fakeAmount, amount);

    const fullCourse = `${evaluate(
      amount?.toString() || '1'
    )} ${from} = ${realAmount} ${to}\n`;
    const minCourse = `${getEmojiByCurrencyCode(from) || ''} ${1} ${from} = ${
      getEmojiByCurrencyCode(to) || ''
    } ${realAmount} ${to}`;
    const finalCourse = amount ? fullCourse + minCourse : minCourse;
    await bot.editMessageText(
      `${finalCourse}\n<pre>${'--------------------'}\nupdated ${
        fakeCourse.updated
      }</pre>\n${
        type === 'XE'
          ? `<a href="https://www.xe.com/currencyconverter/convert/?Amount=${evaluate(
              amount?.toString() || '1'
            )}&From=${from}&To=${to}">xe.com</a>`
          : `<a href="https://www.moex.com/">moex.com</a>`
      }`,
      {
        chat_id,
        message_id,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }
    );
  } catch (e) {
    console.log(e);
    return await bot.editMessageText(
      `Произошла ошибка! Проверьте правильность ввода команды.`,
      {
        chat_id,
        message_id,
        parse_mode: 'HTML',
      }
    );
  }
};
