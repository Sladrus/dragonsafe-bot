const { default: axios } = require('axios');

const API_TOKEN = process.env.API_TOKEN;
const API_URL = process.env.API_URL;

const botApi = axios.create({
  baseURL: API_URL,
  headers: { 'x-api-key': `${API_TOKEN}` },
});

const CONVERT_URL = process.env.CONVERT_URL;

const convertApi = axios.create({
  baseURL: CONVERT_URL,
});

module.exports = { botApi, convertApi };
