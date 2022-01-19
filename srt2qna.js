console.log("Welcome to SRT 2 QNA Tool!");
console.log("Load a str file to here, and I'll split it up.");
console.log("However, you must pair Q and A.");
console.log("For each line printed, you can press:");
console.log("<Enter>: Accept and switch role.");
console.log("<Space>: Append to current.");
console.log("D: Drop this line.");
console.log("R: Reset buffer and drop stored lines.");
console.log("Q: Quit or abort.");
console.log("E: Edit this line.");
// TODO: add edit

function preStr(origin) {
  const NREGEX = /^[0-9]+$/;
  let o = [];
  origin.split("\n").forEach((l) => {
    l = l.trim();
    if (l.length > 0) {
      if (!l.includes("-->")) {
        if (!NREGEX.test(l)) {
          o.push(l);
        }
      }
    }
  });
  return o;
}

const fs = require("fs");
const CryptoJS = require("crypto-js");
import("chalk").then((chalk) => {
  let strs = preStr(
    fs.readFileSync("./wd/" + process.argv[2] + ".srt").toString()
  );

  let cline = strs.shift();
  let mode = "Q";
  let kq = "";
  let ka = "";
  let bufs = [];

  function fprint() {
    console.log("\n".repeat(10));
    if (mode === "Q") {
      console.log(chalk.default.yellow("Q: " + kq));
      console.log(chalk.default.gray("A: " + ka));
    } else {
      console.log(chalk.default.gray("Q: " + kq));
      console.log(chalk.default.yellow("A: " + ka));
    }
    console.log("");
    console.log("1> " + cline);
    for (let i = 0; i < 10; i++) {
      if (strs[i]) {
        console.log(chalk.default.gray(i + 2 + ": " + strs[i]));
      }
    }
  }

  function buildJSON(lines) {
    let obj = {
      name: process.argv[2].trim(),
      locale: "zh",
      data: [],
    };
    for (let x of lines) {
      let xs = x.split(",");
      let k = CryptoJS.SHA256(xs[1]).toString();
      obj.data.push({
        intent: k,
        utterances: [xs[0]],
        answers: [xs[1]],
      });
    }
    return JSON.stringify(obj, null, 2);
  }
  function xsave() {
    fs.writeFileSync(
      "./corpus/" + process.argv[2].trim() + ".json",
      buildJSON(bufs)
    );
  }

  function mck() {
    if (cline.length <= 0) {
      console.log("You've reached the end!");
      xsave();
      process.exit(0);
    }
  }

  const readline = require("readline");
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  fprint();
  process.stdin.on("keypress", (_e, k) => {
    switch (k.name) {
      case "d":
        console.log(">>> DROP");
        cline = strs.shift();
        break;
      case "space":
        if (mode === "Q") {
          kq += cline;
        } else {
          ka += cline;
        }
        cline = strs.shift();
        break;
      case "return":
        console.log(">>> OK");
        if (mode === "Q") {
          mode = "A";
          kq += cline;
        } else {
          mode = "Q";
          ka += cline;
          bufs.push(kq + "," + ka);
          kq = "";
          ka = "";
        }
        cline = strs.shift();
        break;
      case "r":
        console.log(">>> RESET");
        kq = "";
        ka = "";
        mode = "Q";
        break;
      case "q":
        console.log(">>> QUIT");
        xsave();
        process.exit(0);
      default:
        return;
    }
    fprint();
    mck();
  });
});

setInterval(() => {}, 2147483647);
