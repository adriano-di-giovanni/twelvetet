import Pitch from './Pitch'

/**
 * @class TwelveTet
 * @param {Number} [tuningFrequency=440] The tuning frequency in hertz.
 * @example
 * import TwelveTet from 'twelvetet'
 *
 * let twelvetet
 *
 * // instantiate with default tuning frequency of 440 Hz
 * twelvetet = new TwelveTet()
 *
 * // instantiate with given tuning frequency
 * const tuningFrequency = 432
 * twelvetet = new TwelveTet(tuningFrequency)
 */
export default class TwelveTet {
    constructor(tuningFrequency = 440) {
        this._tuningFrequency = tuningFrequency
    }

    /**
     * Returns a pitch
     *
     * @function pitch
     * @memberof TwelveTet
     * @instance
     * @param {Number|String|Pitch} value
     * @example
     * import TwelveTet from 'twelvetet'
     *
     * const tuningFrequency = 440
     * const twelvetet = new TwelveTet(tuningFrequency)
     *
     *
     * let pitch
     *
     * // create a pitch with the given frequency
     * pitch = twelvetet.pitch(440)
     * console.log(+pitch)           // 440
     * console.log(pitch.toString()) // 'A4'
     *
     * // create a pitch with an out-of-tune frequency
     * pitch = twelvetet.pitch(438)
     * console.log(+pitch) // 440
     * console.log(pitch.toString()) // 'A4'
     * console.log(pitch.offset())   // 0.07887184708183335
     *
     * // create a pitch with scientific notation
     * pitch = twelvetet.pitch('A4')
     *
     * // create a pitch with another pitch
     * pitch = twelvetet.pitch(pitch.next())
     * console.log(pitch.toString()) // 'A#4'
     */
    pitch(value) {
        return Pitch.create(value, this._tuningFrequency)
    }
}
