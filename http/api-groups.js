const { botApi } = require('.');

async function getGroup(user_id, chat_id) {
  try {
    const response = await botApi.get(`/groups/${chat_id}`, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response);
  }
}

async function getEmptyGroup(user_id) {
  try {
    const response = await botApi.get(`/groups/empty`, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response?.status);
  }
}

async function updateGroup(user_id, chat_id, body) {
  try {
    const response = await botApi.post(`/groups/update/${chat_id}`, body, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response);
  }
}

async function createGroup(user_id, body) {
  try {
    const response = await botApi.post(`/groups/create`, body, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.error(e?.response);
  }
}

module.exports = { getGroup, getEmptyGroup, updateGroup, createGroup };
