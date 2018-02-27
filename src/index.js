import { parse } from 'twelvetet-spn'
import Frequency from './Frequency'
import Pitch from './Pitch'

/**
 * @param {Number} [tuningFrequency=440]
 */
export default class TwelveTet {
    constructor(tuningFrequency = 440) {
        if (!isFrequency(tuningFrequency)) {
            throw new TypeError("Missing or invalid argument, 'tuningFrequency'.")
        }
        this._tuningFrequency = new Frequency(tuningFrequency, tuningFrequency)
    }

    /**
     * Returns a Pitch instance
     *
     * @param {Number|String} selector
     * @example
     * const twelvetet = new TwelveTet()
     *
     * twelvetet.pitch('A4')
     * twelvetet.pitch(440)
     */
    pitch(selector) {
        if (typeof selector === 'number') {
            return new Pitch(new Frequency(selector, this._tuningFrequency))
        }

        if (typeof selector === 'string') {
            const semitones = parseSelector(selector)
            return new Pitch(this._tuningFrequency).next(semitones)
        }

        throw new TypeError(`Missing or invalid argument, 'selector'.`)
    }
}

function parseSelector(selector) {
    const result = parse(selector)

    if (result == null) {
        throw new TypeError(`Missing or invalid argument, 'selector'.`)
    }

    return result[1] * 12 + result[0] - 57
}

function isFrequency(value) {
    return typeof value === 'number' && isFinite(value) && value > 0
}
