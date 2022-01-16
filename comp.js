const fs = require("fs");
fs.writeFileSync(
  "model.min.nlp",
  JSON.stringify(JSON.parse(fs.readFileSync("model.nlp").toString()))
);
