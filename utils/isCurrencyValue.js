const { defaultCurrencies } = require('./consts');

const isCurrencyValue = (value) => {
  if (defaultCurrencies.includes(value)) return true;
  return false;
};

module.exports = { isCurrencyValue };
