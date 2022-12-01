const range = (len) => [...Array(len).keys()];

const slidingWindow = (arr, len) =>
  arr
    .reduce(
      (acc, val, idx) => [
        ...acc,
        range(len)
          .map((i) => arr[idx + i])
          .filter((v) => !!v),
      ],
      []
    )
    .filter((p) => p.length == len);

module.exports = { slidingWindow, range };
