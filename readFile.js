const fs = require("fs").promises;

async function readFile(fileName, mapper = (l) => l, split = "\n") {
  const f = await fs.readFile(fileName);
  return split !== undefined
    ? f.toString().split(split).map(mapper)
    : mapper(f.toString());
}

module.exports = readFile;
