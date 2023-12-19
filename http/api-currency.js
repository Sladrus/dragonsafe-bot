const url = require('url');

const { convertApi } = require('.');

async function convertCurrencyXe(from, to, amount = 1) {
  try {
    const params = new url.URLSearchParams({
      from,
      to,
      amount,
    });

    const response = await convertApi.get(`/convert?${params}`);
    return response.data;
  } catch (e) {
    console.error(e?.response);
  }
}

async function convertCurrencyMoex(from, to, amount = 1) {
  try {
    const params = new url.URLSearchParams({
      from,
      to,
      amount,
    });
    const response = await convertApi.get(`/convert_moex?${params}`);
    return response.data;
  } catch (e) {
    console.error(e?.response);
  }
}

module.exports = { convertCurrencyXe, convertCurrencyMoex };
