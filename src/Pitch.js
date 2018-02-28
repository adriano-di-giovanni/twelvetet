import { interval, isFrequency, next, normalize } from './FrequencyHelper'
import { format, parse } from 'twelvetet-spn'

/**
 * Represents a pitch
 *
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
     * @returns {Number} An integer between 0 and 11 representing the [pitch class]{@link https://en.wikipedia.org/wiki/Pitch_class}
     */
    class() {
        // NOTE: original formula was `(9 + semitones % 12) % 12` but `-11 % 12` returns `-11`
        // instead of the expected `1` because the remainder from the modulo operation takes the
        // sign of the dividend. https://mzl.la/2oCl8yz

        return (9 + 12 + interval(this._tuningFrequency, this._frequency) % 12) % 12
    }

    /**
     * Returns the pitch octave.
     *
     * @returns {Number} An integer representing the pitch octave.
     */
    octave() {
        return Math.floor(4 + (9 + interval(this._tuningFrequency, this._frequency)) / 12)
    }

    offset() {
        return interval(this._inputFrequency, this._frequency)
    }

    /**
     * Returns the next pitch at the given number of semitones away from the current pitch.
     *
     * @param {Number} [semitones = 1] An integer representing the number of semitones.
     * @returns {Pitch}
     * @example
     * import TwelveTet from 'twelvetet'
     *
     * const twelvetet = new TwelveTet() // NOTE: default tuning frequency is 440
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
     * @param {Number} [semitones = 1] An integer representing the number of semitones.
     * @returns {Pitch}
     * @example
     * import TwelveTet from 'twelvetet'
     *
     * const twelvetet = new TwelveTet() // NOTE: default tuning frequency is 440
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
     * @param {Number|String|Pitch} value
     */
    intervalTo(value) {
        return Math.round(interval(this._frequency, castFrequency(value, this._tuningFrequency)))
    }

    /**
     * @param {Number|String|Pitch} value
     */
    intervalFrom(value) {
        return Math.round(interval(castFrequency(value, this._tuningFrequency), this._frequency))
    }

    toString(useFlat = false) {
        const accidental = useFlat ? 'b' : '#'
        const re = new RegExp(`^[a-g]${accidental}?\\d+$`, 'i')
        return format([this.class(), this.octave()]).find(e => re.test(e))
    }

    valueOf() {
        return this._frequency
    }
}

Pitch.create = function(value, tuningFrequency) {
    return new Pitch(castFrequency(value, tuningFrequency))
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
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
}
