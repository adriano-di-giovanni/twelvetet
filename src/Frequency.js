import FrequencyInternal from './FrequencyInternal'

const round = Math.round

/**
 * @param {Number} inputFrequency The input frequency in hertz.
 */
export default class Frequency {
    constructor(inputFrequency, tuningFrequency) {
        this._inputFrequency = new FrequencyInternal(inputFrequency)
        this._tuningFrequency = new FrequencyInternal(tuningFrequency)
        this._frequency = createFrequency.call(this, inputFrequency)
    }

    offset() {
        return this._inputFrequency.intervalTo(this._frequency)
    }

    next(semitones = 1) {
        return new Frequency(this._frequency.next(semitones), this._tuningFrequency)
    }

    previous(semitones = 1) {
        return new Frequency(this._frequency.next(-semitones), this._tuningFrequency)
    }

    intervalFrom(frequency = this._tuningFrequency) {
        return this._frequency.intervalFrom(frequency)
    }

    intervalTo(frequency = this._tuningFrequency) {
        return this._frequency.intervalTo(frequency)
    }

    valueOf() {
        return +this._frequency
    }
}

function createFrequency(frequency) {
    const semitones = round(this._inputFrequency.intervalFrom(this._tuningFrequency))
    return this._tuningFrequency.next(semitones)
}
