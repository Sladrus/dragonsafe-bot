const { evaluate } = require('mathjs');

module.exports = async function inlineQueryEvent(bot, msg) {
  const query = msg.query;
  const id = msg.id;

  try {
    let answer;
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
    if (query) {
      const result = evaluate(query); // this will evaluate the expression entered by user
      answer = {
        id: msg.id,
        type: 'article',
        title: `Результат: ${formatter.format(result).replaceAll(',', "'")}`,
        input_message_content: {
          message_text: `${query} = ${formatter
            .format(result)
            .replaceAll(',', "'")}`,
        },
        description: `${query} = ${formatter
          .format(result)
          .replaceAll(',', "'")}`,
      };

      return bot.answerInlineQuery(id, [answer]);
    }
    bot.answerInlineQuery(id, []);
  } catch (e) {
    console.log(e);
    bot.answerInlineQuery(id, [
      {
        id: id,
        type: 'article',
        title: `Введите корректное выражение`,
        input_message_content: {
          message_text: `Введите корректное выражение`,
        },
      },
    ]);
  }
};
