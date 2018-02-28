import Pitch from './Pitch'

/**
 * @param {Number} [tuningFrequency=440] The tuning frequency in hertz.
 */
export default class TwelveTet {
    constructor(tuningFrequency = 440) {
        this._tuningFrequency = tuningFrequency
    }

    /**
     * Returns a pitch
     *
     * @param {Number|String|Pitch} value
     */
    pitch(value) {
        return Pitch.create(value, this._tuningFrequency)
    }
}
