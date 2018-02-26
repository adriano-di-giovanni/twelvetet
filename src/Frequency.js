import Interval, { SEMITONE } from './Interval'

export default class Frequency {
    constructor(value) {
        if (!isFrequency(value)) {
            throw new TypeError(
                "Missing or invalid argument, 'value'. Frequency or positive number expected."
            )
        }

        this._value = +value
    }

    getIntervalFrom(value) {
        return Frequency.getInterval(value, this._value)
    }

    getIntervalTo(value) {
        return Frequency.getInterval(this._value, value)
    }

    valueOf() {
        return this._value
    }
}

Frequency.getInterval = (fromValue, toValue) => {
    if (!isFrequency(fromValue)) {
        throw new TypeError(
            "Missing or invalid argument, 'fromValue'. Frequency or positive number expected."
        )
    }

    if (!isFrequency(toValue)) {
        throw new TypeError(
            "Missing or invalid argument, 'toValue'. Frequency or positive number expected."
        )
    }

    // NOTE: `Math.log2(toValue / fromValue)` returns the number of octaves between the `fromValue`
    // freqyency to the `toValue` frequency. Lesson learned.
    return new Interval(SEMITONE * Math.log2(toValue / fromValue))
}

function isFrequency(value) {
    return value instanceof Frequency || (typeof value === 'number' && isFinite(value) && value > 0)
}
