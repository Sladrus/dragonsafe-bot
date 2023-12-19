const { botApi } = require('.');

async function createLog(user_id, body) {
  try {
    const response = await botApi.post(`/logs/create`, body, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    // console.error(e?.response);
  }
}

module.exports = { createLog };
