const fs = require("fs/promises");
(async () => {
  await fs.copyFile(
    "./inj-index.js",
    "./node_modules/@nlpjs/lang-all/src/index.js"
  );
  await fs.copyFile(
    "./inj-lang-all.js",
    "./node_modules/@nlpjs/lang-all/src/lang-all.js"
  );
  await fs.copyFile(
    "./inj-lang-functions.js",
    "./node_modules/@nlpjs/lang-all/src/lang-functions.js"
  );
})();
