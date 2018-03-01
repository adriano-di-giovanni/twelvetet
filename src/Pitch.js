import { interval, isFrequency, next, normalize } from './FrequencyHelper'
import { format, parse } from 'twelvetet-spn'

const floor = Math.floor
const round = Math.round

/**
 * Represents a pitch.
 *
 * @class Pitch
 * @inner
 * @param {Number} inputFrequency A positive number representing the input frequency in hertz.
 * @param {Number} tuningFrequency A positive number representing the tuning frequency in hertz.
 */
export default class Pitch {
    constructor(inputFrequency, tuningFrequency) {
        if (!isFrequency(inputFrequency)) {
            throw new TypeError("Missing or invalid argument, 'inputFrequency'.")
        }

        if (!isFrequency(tuningFrequency)) {
            throw new TypeError("Missing or invalid argument, 'tuningFrequency'")
        }

        this._inputFrequency = inputFrequency
        this._tuningFrequency = tuningFrequency
        this._frequency = normalize(inputFrequency, tuningFrequency)
    }

    /**
     * Returns the [pitch class]{@link https://en.wikipedia.org/wiki/Pitch_class}
     *
     * @function class
     * @memberof Pitch
     * @instance
     * @returns {Number} An integer between 0 and 11 representing the [pitch class]{@link https://en.wikipedia.org/wiki/Pitch_class}
     */
    class() {
        // NOTE: original formula was `(9 + semitones % 12) % 12` but `-11 % 12` returns `-11`
        // instead of the expected `1` because the remainder from the modulo operation takes the
        // sign of the dividend. https://mzl.la/2oCl8yz

        return (9 + 12 + round(interval(this._tuningFrequency, this._frequency)) % 12) % 12
    }

    /**
     * Returns the pitch octave.
     *
     * @function octave
     * @memberof Pitch
     * @instance
     * @returns {Number} An integer representing the pitch octave.
     */
    octave() {
        return floor(4 + (9 + interval(this._tuningFrequency, this._frequency)) / 12)
    }

    /**
     * Returns the number of semitones between the input and the normalized frequencies.
     *
     * @function offset
     * @memberof Pitch
     * @instance
     * @returns {Number} The number of semitones between the input and the normalized frequencies.
     */
    offset() {
        return interval(this._inputFrequency, this._frequency)
    }

    /**
     * Returns the next pitch at the given number of semitones away from the current pitch.
     *
     * @function next
     * @memberof Pitch
     * @instance
     * @param {Number} [semitones = 1] An integer representing the number of semitones.
     * @returns {Pitch}
     * @example
     * import TwelveTet from 'twelvetet'
     *
     * const tuningFrequency = 440
     * const twelvetet = new TwelveTet(tuningFrequency)
     *
     * const pitch = twelvetet.pitch('A4')
     * const pitches = {
     *   'A#4': pitch.next(), // or pitch.next(1)
     *   'B4': pitch.next(2), // or pitch.next().next()
     *   'G#4': pitch.next(-1)
     *   'G4': pitch.next(-2)
     * }
     */
    next(semitones = 1) {
        if (!isInteger(semitones)) {
            throw new TypeError("Missing or invalid argument, 'semitones'. Integer expected.")
        }
        const frequency = next(this._frequency, semitones)
        return new Pitch(frequency, this._tuningFrequency)
    }

    /**
     * Returns the previous pitch at the given number of semitones away from the current pitch.
     *
     * @function previous
     * @memberof Pitch
     * @instance
     * @param {Number} [semitones = 1] An integer representing the number of semitones.
     * @returns {Pitch}
     * @example
     * import TwelveTet from 'twelvetet'
     *
     * const tuningFrequency = 440
     * const twelvetet = new TwelveTet(tuningFrequency)
     *
     * const pitch = twelvetet.pitch('A4')
     * const pitches = {
     *   'G#4': pitch.previous(), // or pitch.previous(1)
     *   'G4': pitch.previous(2), // or pitch.previous().previous()
     *   'A#4': pitch.previous(-1)
     *   'B4': pitch.previous(-2)
     * }
     */
    previous(semitones = 1) {
        if (!isInteger(semitones)) {
            throw new TypeError("Missing or invalid argument, 'semitones'. Integer expected.")
        }
        const frequency = next(this._frequency, -semitones)
        return new Pitch(frequency, this._tuningFrequency)
    }

    /**
     * Returns the number of semitones between the current pitch and the pitch represented by the given value
     *
     * @function intervalTo
     * @memberof Pitch
     * @instance
     * @param {Number|String|Pitch} value A value representing a pitch. It can be any of the following:
     * <ul>
     *     <li>a positive number representing a frequency in hertz. If the frequency is out-of-tune, `intervalTo` returns the interval between the frequency of the current pitch and the normalized frequency.</li>
     *     <li>a string representing scientific pitch notation</li>
     *     <li>an instance of [Pitch]{@link Pitch}.</li>
     * </ul>
     */
    intervalTo(value) {
        return round(interval(this._frequency, castFrequency(value, this._tuningFrequency)))
    }

    /**
     * Returns the number of semitones between the pitch represented by the given value and the current pitch.
     *
     * @function intervalFrom
     * @memberof Pitch
     * @instance
     * @param {Number|String|Pitch} value A value representing a pitch. It can be any of the following:
     * <ul>
     *     <li>a positive number representing a frequency in hertz. If the frequency is out-of-tune, `intervalFrom` returns the interval between  the normalized frequency and the frequency of the current pitch.</li>
     *     <li>a string representing scientific pitch notation</li>
     *     <li>an instance of [Pitch]{@link Pitch}. If the pitch is from an out-of-tune frequency, `intervalFrom` returns the interval between the normalized frequency and the frequency of the current pitch.</li>
     * </ul>
     */
    intervalFrom(value) {
        return round(interval(castFrequency(value, this._tuningFrequency), this._frequency))
    }

    /**
     * Returns scientific notation of the current pitch
     * @function toString
     * @memberof Pitch
     * @instance
     * @param {Boolean} [useFlat=false] If true, use the flat enharmonic equivalent.
     * @example
     * import TwelveTet from 'twelvetet'
     *
     * const tuningFrequency = 440
     * const twelvetet = new TwelveTet(tuningFrequency)
     *
     * const pitch = twelvetet.pitch('A#4')
     * console.log(pitch)                // 'A#4'
     * console.log(pitch.toString())     // 'A#4'
     * console.log(pitch.toString(true)) // 'Bb4'
     */
    toString(useFlat = false) {
        const accidental = useFlat ? 'b' : '#'
        const re = new RegExp(`^[a-g]${accidental}?\\d+$`, 'i')
        return format([this.class(), this.octave()]).find(e => re.test(e))
    }

    /**
     * Returns the normalized frequency of the pitch.
     *
     * @function valueOf
     * @memberof Pitch
     * @instance
     * @example
     * import TwelveTet from 'twelvetet'
     *
     * const tuningFrequency = 440
     * const twelvetet = new TwelveTet(tuningFrequency)
     *
     * // returns the normalized frequency
     * const pitch = twelvetet.pitch(438)
     * console.log(+pitch)          // 440
     * console.log(pitch.valueOf()) // 440
     */
    valueOf() {
        return this._frequency
    }
}

Pitch.create = function(value, tuningFrequency) {
    return new Pitch(castFrequency(value, tuningFrequency), tuningFrequency)
}

function castFrequency(value, tuningFrequency) {
    if (value instanceof Pitch) {
        return +value
    }

    if (typeof value === 'string') {
        const result = parse(value)

        if (result == null) {
            throw new Error("Invalid argument, 'value'.")
        }

        return next(tuningFrequency, result[1] * 12 + result[0] - 57)
    }

    if (isFrequency(value)) {
        return normalize(value, tuningFrequency)
    }

    throw new TypeError("Missing or invalid argument, 'value'.")
}

function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && floor(value) === value
}
