const log2 = Math.log2
const pow = Math.pow
const round = Math.round

const TWELFTH_ROOT_OF_TWO = pow(2, 1 / 12)

export function next(frequency, semitones) {
    return frequency * pow(TWELFTH_ROOT_OF_TWO, semitones)
}

export function interval(fromFrequency, toFrequency) {
    return 12 * log2(toFrequency / fromFrequency)
}

export function isFrequency(value) {
    return typeof value === 'number' && isFinite(value) && value > 0
}

export function normalize(frequency, tuningFrequency) {
    const semitones = round(interval(tuningFrequency, frequency))
    return next(tuningFrequency, semitones)
}
