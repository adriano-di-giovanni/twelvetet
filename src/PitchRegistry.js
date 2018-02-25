import Pitch from './Pitch'
import PitchClassOctave from './PitchClassOctave'

const pow = Math.pow

const TWELFTH_ROOT_OF_TWO = pow(2, 1 / 12)

export default class PitchRegistry {
    constructor(frequency = 440) {
        this._pitchClassOctave = new PitchClassOctave([9, 4]) // A4
        this._frequency = frequency
        this._pitches = {}
    }

    get(value) {
        const pitchClassOctave = new PitchClassOctave(value)
        const pitches = this._pitches
        const key = +pitchClassOctave
        if (pitches[key] == null) {
            pitches[key] = create.call(this, pitchClassOctave)
        }
        return pitches[key]
    }
}

function create(pitchClassOctave) {
    const semitones = this._pitchClassOctave.getInterval(pitchClassOctave).getSemitones()
    const frequency = this._frequency * pow(TWELFTH_ROOT_OF_TWO, semitones)
    return new Pitch(pitchClassOctave, frequency)
}
