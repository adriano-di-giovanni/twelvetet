/**
 * @param {Number} semitones
 */
export default class Interval {
    constructor(semitones) {
        this._semitones = +semitones
    }

    semitones() {
        return this._semitones
    }

    cents() {
        return this._semitones * 100
    }

    octaves() {
        return this._semitones / 12
    }

    valueOf() {
        return this._semitones
    }
}
