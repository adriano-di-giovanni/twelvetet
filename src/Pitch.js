import { format } from 'twelvetet-spn'

/**
 * @param {Frequency} frequency
 */
export default class Pitch {
    constructor(frequency) {
        this._frequency = frequency
    }

    next(semitones) {
        return new Pitch(this._frequency.next(semitones))
    }

    previous(semitones) {
        return new Pitch(this._frequency.previous(semitones))
    }

    offset() {
        return this._frequency().offset()
    }

    class() {
        // NOTE: original formula was `(9 + semitones % 12) % 12` but `-11 % 12` returns `-11`
        // instead of the expected `1` because the remainder from the modulo operation takes the
        // sign of the dividend. https://mzl.la/2oCl8yz

        return (9 + 12 + this.intervalFrom() % 12) % 12
    }

    octave() {
        return Math.floor(4 + (9 + this.intervalFrom()) / 12)
    }

    // TODO: it should accept 'A4', 440, a Pitch instance
    intervalTo(pitch) {
        let frequency
        if (pitch != null) {
            frequency = pitch.frequency()
        }
        return Math.round(this._frequency.intervalTo(frequency))
    }

    // TODO: it should accept 'A4', 440, a Pitch instance
    intervalFrom(pitch) {
        let frequency
        if (pitch != null) {
            frequency = pitch.frequency()
        }
        return Math.round(this._frequency.intervalFrom(frequency))
    }

    frequency() {
        return this._frequency
    }

    toString(useFlat = false) {
        const accidental = useFlat ? 'b' : '#'
        const re = new RegExp(`^[a-g]${accidental}?\\d+$`, 'i')
        return format([this.class(), this.octave()]).find(e => re.test(e))
    }

    valueOf() {
        return +this._frequency
    }
}
