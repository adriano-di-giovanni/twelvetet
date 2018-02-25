import Interval from './Interval'

export default class PitchClassOctave {
    constructor(value) {
        this._value = value.slice(0)
    }

    getPitchClass() {
        return this._value[0]
    }

    getOctave() {
        return this._value[1]
    }

    getInterval(value) {
        return new Interval(this - value)
    }

    valueOf() {
        return this.getOctave() * 12 + this.getPitchClass()
    }
}
