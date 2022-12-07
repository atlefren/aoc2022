const { run } = require("../run");

const parse = (i) => i;

const isCommand = (cmd) => cmd.startsWith("$");
const getCommand = (line) => [
  line.replace("$ ", "").split(" ")[0],
  line.replace("$ ", "").split(" ").slice(1),
];

const addTodir = (dir, dir2) =>
  [...dir.split("/"), dir2].join("/").replace("//", "/");

const removeLast = (dir) =>
  `/${dir.split("/").slice(0, -1).join("/")}`.replace("//", "/");

const parseLs = (currentDir, output) => {
  const [a, b] = output.split(" ");

  return a === "dir"
    ? { type: "dir", path: `${currentDir}/${b}`.replace("//", "/") }
    : { type: "file", size: parseInt(a), name: b };
};

const buildDirectoryTree = (directories, root = "/") => ({
  path: root,
  tree: directories[root].map((e) =>
    e.type === "dir" ? buildDirectoryTree(directories, e.path) : e
  ),
});

const getFiles = (directory, directories) =>
  directories[directory].reduce(
    (acc, el) =>
      el.type === "file"
        ? [...acc, el]
        : [...acc, ...getFiles(el.path, directories)],
    []
  );

const parseOutput = (lines) =>
  lines.reduce(
    (acc, line) => {
      if (isCommand(line)) {
        if (acc.output && acc.prevCommand === "ls") {
          acc.directories[acc.currentDir] = [...acc.output];
        }

        const [command, args] = getCommand(line);
        if (command === "cd") {
          if (args[0] === "/") {
            acc.currentDir = "/";
          } else if (args[0] === "..") {
            acc.currentDir = removeLast(acc.currentDir);
          } else {
            acc.currentDir = addTodir(acc.currentDir, args[0]);
          }
        }
        if (command === "ls") {
          acc.output = [];
        }
        acc.prevCommand = command;
      } else {
        if (acc.output) {
          acc.output.push(parseLs(acc.currentDir, line));
        }
      }
      return acc;
    },
    {
      currentDir: undefined,
      output: undefined,
      directories: {},
      prevCommand: undefined,
    }
  ).directories;

const getSize = (files) => files.reduce((acc, e) => acc + e.size, 0);

const filterSizes = (directories, fn) =>
  Object.keys(directories)
    .map((d) => getSize(getFiles(d, directories)))
    .filter(fn);

const task1 = (input) =>
  filterSizes(parseOutput([...input, "$ cd /"]), (s) => s <= 100000).reduce(
    (acc, e) => acc + e,
    0
  );

const task2 = (input) => {
  const directories = parseOutput([...input, "$ cd /"]);

  const needToFree =
    30000000 - (70000000 - getSize(getFiles("/", directories)));

  return filterSizes(directories, (s) => s >= needToFree).sort(
    (a, b) => a - b
  )[0];
};

run(parse, task1, task2, true);

//34257857 = wrong
