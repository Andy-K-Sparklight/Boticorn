const fs = require("fs");
const inquirer = require("inquirer");
const FNAME = process.argv[2];
if (!FNAME) {
  console.log("It's impossible to do it without a filename!");
  process.exit();
}
let TEMPLATE = {
  name: FNAME,
  locale: "zh",
  data: [],
};
try {
  TEMPLATE = JSON.parse(
    fs.readFileSync("./corpus/" + FNAME + ".json").toString()
  );
} catch {}

(async () => {
  console.log(
    "Welcome to Boticorn EditTools! Just enter values for each option."
  );
  console.log(
    "An empty value will end the utterances/answers list and an empty intent will tell me to quit."
  );
  while (true) {
    let { intent } = await inquirer.prompt([{ type: "input", name: "intent" }]);
    if (intent.length <= 0) {
      break;
    }
    let ut = [];
    let as = [];
    while (true) {
      let { utterance } = await inquirer.prompt([
        { type: "input", name: "utterance" },
      ]);
      if (utterance.length > 0) {
        ut.push(utterance);
      } else {
        break;
      }
    }
    while (true) {
      let { answer } = await inquirer.prompt([
        { type: "input", name: "answer" },
      ]);
      if (answer.length > 0) {
        as.push(answer);
      } else {
        break;
      }
    }
    if (ut.length > 0 && as.length > 0) {
      TEMPLATE.data.push({ intent, utterances: ut, answers: as });
    }
  }
  fs.writeFileSync(
    "./corpus/" + FNAME + ".json",
    JSON.stringify(TEMPLATE, null, 2)
  );
  console.log("Written to " + FNAME + ".json");
})();
