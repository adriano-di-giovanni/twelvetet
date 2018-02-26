import Frequency from './Frequency'

export default class Pitch {
    constructor(pitchClassOctave, frequency) {
        this._pitchClassOctave = pitchClassOctave
        this._frequency = new Frequency(frequency)
    }

    getClass() {
        return this._pitchClassOctave.getPitchClass()
    }

    getOctave() {
        return this._pitchClassOctave.getOctave()
    }

    getFrequency() {
        return this._frequency
    }
}
