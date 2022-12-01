const fs = require("fs").promises;

const exists = async (dir) => {
  try {
    await fs.access(dir, fs.constants.F_OK);
    return false;
  } catch (e) {
    return true;
  }
};

const template = `const { run } = require("../run");

const parse = i => i;

const task1 = (input) => {
  console.log(input);
}

const task2 = (input) => {}

run(parse, task1, task2, false);`;

const main = async () => {
  const folder = `./day${process.argv[2]}`;
  if (!(await exists(folder))) {
    console.log("day exists");
    return 1;
  }
  await fs.mkdir(folder);
  await fs.writeFile(`${folder}/testinput.txt`, "", "utf8");
  await fs.writeFile(`${folder}/input.txt`, "", "utf8");
  await fs.writeFile(`${folder}/index.js`, template, "utf8");
};

main();
