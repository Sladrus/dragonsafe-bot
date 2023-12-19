const { botApi } = require('.');

async function activateUser(user_id, body) {
  try {
    const response = await botApi.post(`/users/activate`, body, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response);
  }
}

async function checkUser(user_id) {
  try {
    const response = await botApi.get(`/users/check`, {
      headers: { 'TG-User': user_id },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response);
  }
}

module.exports = { activateUser, checkUser };
