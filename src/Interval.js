const floor = Math.floor

export default class Interval {
    constructor(semitones) {
        this._semitones = semitones
    }

    getCents() {
        return this._semitones * 100
    }

    getOctaves() {
        return floor(this._semitones / 12)
    }

    getSemitones() {
        return this._semitones
    }
}
