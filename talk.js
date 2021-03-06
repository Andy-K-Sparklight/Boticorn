const { NlpManager, ConversationContext } = require("node-nlp");
const inquirer = require("inquirer");

const manager = new NlpManager({
  languages: ["zh"],
  modelFileName: "model.json",
});
manager.load("model.json");
console.log("Model loaded, now you may talk with the bot.");

const context = new ConversationContext();

(async () => {
  await manager.process("zh", "");
  while (true) {
    let { "<<<": res } = await inquirer.prompt([
      { type: "input", name: "<<<" },
    ]);
    if (String(res).length > 0) {
      console.log(">>> " + (await manager.process("zh", res, context)).answer);
    }
  }
})();
