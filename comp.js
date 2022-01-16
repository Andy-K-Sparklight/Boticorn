const fs = require("fs");
fs.writeFileSync(
  "model.min.json",
  JSON.stringify(JSON.parse(fs.readFileSync("model.json").toString()))
);
