const { botApi } = require('.');

async function getBalances(user_id, chat_id) {
  try {
    const response = await botApi.get(`/balances/${chat_id}`, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response);
  }
}

async function updateBalances(user_id, chat_id, body) {
  try {
    const response = await botApi.post(`/balances/update/${chat_id}`, body, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response);
  }
}

async function deleteBalances(user_id, chat_id, body) {
  try {
    const response = await botApi.post(`/balances/delete/${chat_id}`, body, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response);
  }
}

module.exports = { getBalances, updateBalances, deleteBalances };
