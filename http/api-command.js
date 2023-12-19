const url = require('url');

const { botApi } = require('.');

async function getCmdMessages(command, user_id, chat_id) {
  try {
    const params = new url.URLSearchParams({
      name: command,
    });
    const response = await botApi.get(`/command/${chat_id}?${params}`, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.error(e?.response);
  }
}

module.exports = { getCmdMessages };
