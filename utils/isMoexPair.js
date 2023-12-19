const { defaultCurrencies, moex_currency_pairs } = require('./consts');

const isMoexPair = (value) => {
  if (moex_currency_pairs.includes(value)) return true;
  return false;
};

module.exports = { isMoexPair };
