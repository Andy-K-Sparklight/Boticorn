const fs = require("fs/promises");
const path = require("path");
const { NlpManager } = require("node-nlp");

const FILE_NAME = "model.nlp";
(async () => {
  const manager = new NlpManager({
    languages: ["zh"],
    modelFileName: FILE_NAME,
    autoSave: true,
  });
  console.log("Loading files...");
  let dir = await fs.readdir("./corpus");
  let count = 0;
  for (let d of dir) {
    if (d.endsWith(".json")) {
      manager.addCorpus(path.join("./corpus", d));
    } else if (d.endsWith(".js")) {
      require(path.resolve("./corpus", d))(manager);
    }
    count++;
  }
  console.log(`Loaded ${count} files. Training...`);
  await manager.train();
  console.log("Nice job! Training has completed, saving...");
  manager.save(FILE_NAME);
  console.log("All tasks completed, exit.");
})();
