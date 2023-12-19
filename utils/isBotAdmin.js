const isBotAdmin = async (bot, chat_id) => {
  const me = await bot.getMe();

  try {
    return await bot
      .getChatMember(chat_id, me.id)
      .then((data) => {
        if (data.status == 'administrator') {
          return true;
        }
        return false;
      })
      .catch((e) => {
        return false;
      });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { isBotAdmin };
