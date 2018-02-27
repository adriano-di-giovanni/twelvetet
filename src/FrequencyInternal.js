import Interval from './Interval'

const TWELFTH_ROOT_OF_TWO = Math.pow(2, 1 / 12)

/**
 * @param {Number} value
 */
export default class Frequency {
    constructor(value) {
        this._value = +value
    }

    /**
     * @param {Number} [semitones=1]
     * @returns {Frequency}
     */
    next(semitones = 1) {
        return new Frequency(this._value * Math.pow(TWELFTH_ROOT_OF_TWO, semitones))
    }

    /**
     * @param {Number} [semitones=1]
     * @returns {Frequency}
     */
    previous(semitones = 1) {
        return new Frequency(this._value * Math.pow(TWELFTH_ROOT_OF_TWO, -semitones))
    }

    /**
     * @param {Number} frequency
     */
    intervalFrom(frequency) {
        return new Interval(12 * Math.log2(this._value / frequency))
    }

    /**
     * @param {Number} frequency
     */
    intervalTo(frequency) {
        return new Interval(12 * Math.log2(frequency / this._value))
    }

    /**
     * @returns {Number}
     */
    valueOf() {
        return this._value
    }
}
