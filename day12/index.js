const { run } = require("../run");
const { Graph } = require("./graph");
const { getNeighbours } = require("../util");
const parse = (i) => i.split("");

const toValue = (letter) =>
  (letter === "S" ? "a" : letter === "E" ? "z" : letter).charCodeAt(0);

const canWalk = (map, currentPos, newPos) =>
  toValue(map[newPos[0]][newPos[1]]) -
    toValue(map[currentPos[0]][currentPos[1]]) <=
  1;

const findElements = (map, key) =>
  map.reduce((acc, line, i) => {
    const exists = line.findIndex((l) => l === key);
    return exists !== -1 ? [...acc, [i, exists]] : acc;
  }, []);

const getReachableNeighbours = (map, pos) =>
  getNeighbours(map, pos).filter((neighbour) => canWalk(map, pos, neighbour));

const toCoord = (pos) => `${pos[0]}_${pos[1]}`;

const buildGraph = (map) =>
  map.reduce(
    (acc, line, x) => ({
      ...line.reduce(
        (acc, _, y) => ({
          [toCoord([x, y])]: getReachableNeighbours(map, [x, y]).reduce(
            (acc, n) => ({ ...acc, [toCoord(n)]: 1 }),
            {}
          ),
          ...acc,
        }),
        {}
      ),
      ...acc,
    }),
    {}
  );

const getShortest = (graph, from, to) =>
  graph.findShortestPath(toCoord(from), toCoord(to)).length - 1;

const task1 = (map) =>
  getShortest(
    new Graph(buildGraph(map)),
    findElements(map, "S")[0],
    findElements(map, "E")[0]
  );

const task2 = (map) => {
  const graph = new Graph(buildGraph(map));
  const to = findElements(map, "E")[0];
  return Math.min(
    ...[...findElements(map, "S"), ...findElements(map, "a")].map((from) =>
      getShortest(graph, from, to)
    )
  );
};

run(parse, task1, task2, true);
