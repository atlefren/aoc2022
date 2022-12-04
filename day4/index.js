const { run } = require("../run");

const parse = (i) => i;

const contains = (p1, p2) => p1[0] >= p2[0] && p1[1] <= p2[1];

const isContained = (pair) => contains(...pair) || contains(pair[1], pair[0]);

const overlaps = (p1, p2) => p1[0] >= p2[0] && p1[0] <= p2[1];

const isOverlapping = (pair) =>
  overlaps(pair[0], pair[1]) || overlaps(pair[1], pair[0]);

const parseRange = (r) => r.split("-").map((n) => parseInt(n, 10));

const parsePair = (p) => p.map(parseRange);

const checkPairs = (input, operation) =>
  input
    .map((p) => p.split(","))
    .map(parsePair)
    .filter(operation).length;

const task1 = (input) => checkPairs(input, isContained);

const task2 = (input) => checkPairs(input, isOverlapping);

run(parse, task1, task2, true);
