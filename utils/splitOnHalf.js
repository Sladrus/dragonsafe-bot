const splitInHalf = (inputString) => {
  if (typeof inputString !== 'string' || inputString.length === 0) {
    return;
  }

  const middleIndex = Math.floor(inputString.length / 2);
  const firstHalf = inputString.slice(0, middleIndex);
  const secondHalf = inputString.slice(middleIndex);

  return [firstHalf.toUpperCase(), secondHalf.toUpperCase()];
};

module.exports = { splitInHalf };
