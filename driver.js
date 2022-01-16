const model = require("./model.min.json");
const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["zh"] });

manager.import(model);
globalThis.nlp_process = (s) => {
  return manager.process(s); // This hasn't been evaluated, Alicorn should do that
};
