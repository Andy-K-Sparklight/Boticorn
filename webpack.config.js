const path = require("path");

module.exports = {
  entry: "./driver.js",
  output: {
    filename: "driver.bundle.js",
    path: path.resolve(__dirname),
  },
  mode: "production",
  target: "node",
};
