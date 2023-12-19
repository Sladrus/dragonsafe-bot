const getSymbolFromCurrency = require('currency-symbol-map');

const currencyFormatter = (currency, money) => {
  var symbol = currency === 'USDT' ? '₮' : getSymbolFromCurrency(currency);
  symbol = symbol ? ' ' + symbol : ' ' + currency;
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(money).replaceAll(',', "'") + symbol;
};

module.exports = { currencyFormatter };
