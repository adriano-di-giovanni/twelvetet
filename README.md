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

## API

## Classes

<dl>
<dt><a href="#TwelveTet">TwelveTet</a></dt>
<dd></dd>
</dl>

<a name="TwelveTet"></a>

## TwelveTet
**Kind**: global class  

* [TwelveTet](#TwelveTet)
    * [new TwelveTet([tuningFrequency])](#new_TwelveTet_new)
    * [.pitch(value)](#TwelveTet+pitch)

<a name="new_TwelveTet_new"></a>

### new TwelveTet([tuningFrequency])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [tuningFrequency] | <code>Number</code> | <code>440</code> | The tuning frequency in hertz. |

**Example**  
```js
import TwelveTet from 'twelvetet'

let twelvetet

// instantiate with default tuning frequency of 440 Hz
twelvetet = new TwelveTet()

// instantiate with given tuning frequency
const tuningFrequency = 432
twelvetet = new TwelveTet(tuningFrequency)
```
<a name="TwelveTet+pitch"></a>

### twelveTet.pitch(value)
Returns a pitch

**Kind**: instance method of [<code>TwelveTet</code>](#TwelveTet)  

| Param | Type |
| --- | --- |
| value | <code>Number</code> \| <code>String</code> \| [<code>Pitch</code>](#Pitch) | 

**Example**  
```js
import TwelveTet from 'twelvetet'

const tuningFrequency = 440
const twelvetet = new TwelveTet(tuningFrequency)


let pitch

// create a pitch with the given frequency
pitch = twelvetet.pitch(440)
console.log(+pitch)           // 440
console.log(pitch.toString()) // 'A4'

// create a pitch with an out-of-tune frequency
pitch = twelvetet.pitch(438)
console.log(+pitch) // 440
console.log(pitch.toString()) // 'A4'
console.log(pitch.offset())   // 0.07887184708183335

// create a pitch with scientific notation
pitch = twelvetet.pitch('A4')

// create a pitch with another pitch
pitch = twelvetet.pitch(pitch.next())
console.log(pitch.toString()) // 'A#4'
```
<a name="Pitch"></a>

## ~Pitch
**Kind**: inner class  

* [~Pitch](#Pitch)
    * [new Pitch(inputFrequency, tuningFrequency)](#new_Pitch_new)
    * [.class()](#Pitch+class) ⇒ <code>Number</code>
    * [.octave()](#Pitch+octave) ⇒ <code>Number</code>
    * [.offset()](#Pitch+offset) ⇒ <code>Number</code>
    * [.next([semitones])](#Pitch+next) ⇒ [<code>Pitch</code>](#Pitch)
    * [.previous([semitones])](#Pitch+previous) ⇒ [<code>Pitch</code>](#Pitch)
    * [.intervalTo(value)](#Pitch+intervalTo)
    * [.intervalFrom(value)](#Pitch+intervalFrom)
    * [.toString([useFlat])](#Pitch+toString)
    * [.valueOf()](#Pitch+valueOf)

<a name="new_Pitch_new"></a>

### new Pitch(inputFrequency, tuningFrequency)
Represents a pitch.


| Param | Type | Description |
| --- | --- | --- |
| inputFrequency | <code>Number</code> | A positive number representing the input frequency in hertz. |
| tuningFrequency | <code>Number</code> | A positive number representing the tuning frequency in hertz. |

<a name="Pitch+class"></a>

### pitch.class() ⇒ <code>Number</code>
Returns the [pitch class](https://en.wikipedia.org/wiki/Pitch_class)

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  
**Returns**: <code>Number</code> - An integer between 0 and 11 representing the [pitch class](https://en.wikipedia.org/wiki/Pitch_class)  
<a name="Pitch+octave"></a>

### pitch.octave() ⇒ <code>Number</code>
Returns the pitch octave.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  
**Returns**: <code>Number</code> - An integer representing the pitch octave.  
<a name="Pitch+offset"></a>

### pitch.offset() ⇒ <code>Number</code>
Returns the number of semitones between the input and the normalized frequencies.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  
**Returns**: <code>Number</code> - The number of semitones between the input and the normalized frequencies.  
<a name="Pitch+next"></a>

### pitch.next([semitones]) ⇒ [<code>Pitch</code>](#Pitch)
Returns the next pitch at the given number of semitones away from the current pitch.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [semitones] | <code>Number</code> | <code>1</code> | An integer representing the number of semitones. |

**Example**  
```js
import TwelveTet from 'twelvetet'

const tuningFrequency = 440
const twelvetet = new TwelveTet(tuningFrequency)

const pitch = twelvetet.pitch('A4')
const pitches = {
  'A#4': pitch.next(), // or pitch.next(1)
  'B4': pitch.next(2), // or pitch.next().next()
  'G#4': pitch.next(-1)
  'G4': pitch.next(-2)
}
```
<a name="Pitch+previous"></a>

### pitch.previous([semitones]) ⇒ [<code>Pitch</code>](#Pitch)
Returns the previous pitch at the given number of semitones away from the current pitch.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [semitones] | <code>Number</code> | <code>1</code> | An integer representing the number of semitones. |

**Example**  
```js
import TwelveTet from 'twelvetet'

const tuningFrequency = 440
const twelvetet = new TwelveTet(tuningFrequency)

const pitch = twelvetet.pitch('A4')
const pitches = {
  'G#4': pitch.previous(), // or pitch.previous(1)
  'G4': pitch.previous(2), // or pitch.previous().previous()
  'A#4': pitch.previous(-1)
  'B4': pitch.previous(-2)
}
```
<a name="Pitch+intervalTo"></a>

### pitch.intervalTo(value)
Returns the number of semitones between the current pitch and the pitch represented by the given value

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> \| <code>String</code> \| [<code>Pitch</code>](#Pitch) | A value representing a pitch. It can be any of the following: <ul>     <li>a positive number representing a frequency in hertz. If the frequency is out-of-tune, `intervalTo` returns the interval between the frequency of the current pitch and the normalized frequency.</li>     <li>a string representing scientific pitch notation</li>     <li>an instance of [Pitch](#Pitch).</li> </ul> |

<a name="Pitch+intervalFrom"></a>

### pitch.intervalFrom(value)
Returns the number of semitones between the pitch represented by the given value and the current pitch.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> \| <code>String</code> \| [<code>Pitch</code>](#Pitch) | A value representing a pitch. It can be any of the following: <ul>     <li>a positive number representing a frequency in hertz. If the frequency is out-of-tune, `intervalFrom` returns the interval between  the normalized frequency and the frequency of the current pitch.</li>     <li>a string representing scientific pitch notation</li>     <li>an instance of [Pitch](#Pitch). If the pitch is from an out-of-tune frequency, `intervalFrom` returns the interval between the normalized frequency and the frequency of the current pitch.</li> </ul> |

<a name="Pitch+toString"></a>

### pitch.toString([useFlat])
Returns scientific notation of the current pitch

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [useFlat] | <code>Boolean</code> | <code>false</code> | If true, use the flat enharmonic equivalent. |

**Example**  
```js
import TwelveTet from 'twelvetet'

const tuningFrequency = 440
const twelvetet = new TwelveTet(tuningFrequency)

const pitch = twelvetet.pitch('A#4')
console.log(pitch)                // 'A#4'
console.log(pitch.toString())     // 'A#4'
console.log(pitch.toString(true)) // 'Bb4'
```
<a name="Pitch+valueOf"></a>

### pitch.valueOf()
Returns the normalized frequency of the pitch.

**Kind**: instance method of [<code>Pitch</code>](#Pitch)  
**Example**  
```js
import TwelveTet from 'twelvetet'

const tuningFrequency = 440
const twelvetet = new TwelveTet(tuningFrequency)

// returns the normalized frequency
const pitch = twelvetet.pitch(438)
console.log(+pitch)          // 440
console.log(pitch.valueOf()) // 440
```

## License

This project is [MIT-licensed](LICENSE)
