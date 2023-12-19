const { default: axios } = require('axios');

const Y_FOLDER_ID = process.env.Y_FOLDER_ID;
const Y_IAM_TOKEN = process.env.Y_IAM_TOKEN;
const BOT_TOKEN = process.env.BOT_TOKEN;

module.exports = async function voiceEvent(bot, msg) {
  const fileID = msg.voice.file_id;

  try {
    const fileRes = await bot.getFile(fileID);

    const filePath = fileRes.file_path;
    const fileURL = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

    const response = await axios.get(fileURL, { responseType: 'arraybuffer' });

    const yandexResponse = await axios.post(
      `https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?lang=ru-RU&folderId=${Y_FOLDER_ID}&format=oggopus`,
      response.data,
      {
        headers: {
          Authorization: `Api-Key ${Y_IAM_TOKEN}`,
          'Content-Type': 'audio/ogg',
        },
      }
    );

    const resultText = yandexResponse.data.result;

    await bot.sendMessage(msg.chat.id, resultText, {
      reply_to_message_id: msg.message_id,
    });
  } catch (error) {
    console.log(error);
  }
};
