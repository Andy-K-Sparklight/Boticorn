# Boticorn

The chatbot of Alicorn based on NLP.js. Currently only supports Simplified Chinese.

_Boticorn provides only limited reactions. It's only a hobby project and isn't (probably never will) be production-ready. Use at your own risk!_

## Train

You'll need:

- Node.js, the later the better

- XZ Utils, for and only for output compression

- Git

1. Clone this repo:

   ```shell
   git clone https://github.com/Andy-K-Sparklight/Boticorn.git --depth 1
   ```

2. Install dependencies:

   ```shell
   yarn install
   ```

3. Train the model:

   ```shell
   yarn tr
   ```

The output model will be ready at `<root>/model.nlp`

## Try

After you've trained a model, you can try to talk with it by running:

```shell
yarn try
```

This will start the conversation in the same console window.

## License

All code of this repository is licensed under the _GNU Affero General Public License, Version 3_.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

## Claim Of External Resources

Part of the documents of Boticorn are built from subtitles and most of them come from the Chinese translation of _My Little Pony: Friendship Is Magic_.

The translations have their own copyrights and, since they come from a great number of websites, it's impossible for us to find the name(s) of the author(s).

Because of this, we highly recommand users use this bot **non-commercially**. Also, we have nothing related to any individuals, organizations and/or companies about the subtitles mentioned above.

If you are one of the authors and don't want us to use your work(s) in this way, please let us know by creating a new issue. We'll remove those parts if you want us to.
