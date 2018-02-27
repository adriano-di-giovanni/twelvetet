# TwelveTet

> TwelveTet is a minimalistic [twelve-tone equal temperament](https://en.wikipedia.org/wiki/Equal_temperament) library for Javascript. It helps you manipulate pitches and their frequencies using a simple [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface).

## Installation

Install the latest stable version of TwelveTet using [npm](https://www.npmjs.com/):

```bash
npm install twelvetet
```

You can also [access the files on unpkg.com](https://unpkg.com/twelvetet/).

You can use TwelveTet with module bundlers.

The [npm package](https://www.npmjs.com/package/twelvetet) includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the `dist/` folder. They can be used without a bundler.

The UMD builds make TwelveTet available as `window.TwelveTet` global variable.

TwelveTet works in [any modern browser](http://caniuse.com/#feat=es5) and Node.js.

## Usage

```javascript
import TwelveTet from 'twelvetet'

const twelvetet = new TwelveTet(432) // omit argument to fallback to 440

const pitch = twelvetet.pitch('A4')

console.log(pitch.class()) // 9
console.log(pitch.octave()) // 4
console.log(pitch.frequency()) // 432
```

## License

This project is [MIT-licensed](LICENSE)
