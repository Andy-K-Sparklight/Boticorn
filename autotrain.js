const fs = require("fs/promises");
const path = require("path");
const { NlpManager } = require("node-nlp");
const QnAImporter = require("@nlpjs/qna-importer");
const { containerBootstrap } = require("@nlpjs/core-loader");

const FILE_NAME = "model.json";
(async () => {
  let ct = containerBootstrap();
  ct.use(QnAImporter.QnaImporter);
  const manager = new NlpManager({
    languages: ["zh"],
    modelFileName: FILE_NAME,
    autoSave: true,
    container: ct,
  });
  console.log("Loading files...");
  let dir = await fs.readdir("./corpus");
  let count = 0;
  for (let d of dir) {
    if (d.endsWith(".json")) {
      manager.addCorpus(path.join("./corpus", d));
    } else if (d.endsWith(".js")) {
      require(path.resolve("./corpus", d))(manager);
    } else if (d.endsWith(".tsv")) {
      manager.addCorpus({
        filename: path.join("./corpus", d),
        importer: "qna",
        locale: "zh",
      });
    }
    count++;
  }
  console.log(`Loaded ${count} files. Training...`);
  await manager.train();
  console.log("Nice job! Training has completed, saving...");
  manager.save(FILE_NAME);
  console.log("All tasks completed, exit.");
})();
