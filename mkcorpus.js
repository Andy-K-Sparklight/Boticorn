const fs = require("fs");

const FNAME = process.argv[2];

const TEMPLATE = {
  name: FNAME,
  locale: "zh",
  data: [
    {
      intent: "",
      utterances: [],
      answers: [],
    },
  ],
};

if (FNAME) {
  fs.writeFileSync(
    "./corpus/" + FNAME + ".json",
    JSON.stringify(TEMPLATE, null, 2)
  );
  console.log("Wrote template to " + FNAME);
}
