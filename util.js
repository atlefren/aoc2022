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

const sum = (lst) => lst.reduce((acc, e) => acc + e, 0);

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

module.exports = { slidingWindow, range, sum, chunks };
