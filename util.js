const range = (len, from = 0) => [...Array(len).keys()].map((i) => i + from);

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

const getNeighbours = (map, [i, j]) =>
  [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ].filter(
    (pos) =>
      pos[0] >= 0 &&
      pos[0] < map.length &&
      pos[1] >= 0 &&
      pos[1] < map[pos[0]].length
  );

const uniq = (lst) => [...new Set(lst)];

const isUnique = (lst) => new Set(lst).size === lst.length;

module.exports = {
  slidingWindow,
  range,
  sum,
  chunks,
  uniq,
  isUnique,
  getNeighbours,
};
