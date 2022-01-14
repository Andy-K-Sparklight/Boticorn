# Boticorn

The chatbot of Alicorn based on NLP.js. Currently only supports Simplified Chinese.

*Boticorn provides only limited reactions. It's only a hobby project and isn't (probably never will) be production-ready. Use at your own risk!*

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

All code of this repository is licensed under the *GNU Affero General Public License, Version 3*.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
