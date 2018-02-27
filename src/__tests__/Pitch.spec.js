import Frequency from '../Frequency'
import Pitch from '../Pitch'

const tuningFrequency = new Frequency(440, 440)

it('should be a function', () => {
    expect(typeof Pitch).toBe('function')
})

it('should be a constructor', () => {
    expect(new Pitch(tuningFrequency) instanceof Pitch).toBe(true)
})

describe('next', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(tuningFrequency)
    })

    it('should be a function', () => {
        expect(typeof pitch.next).toBe('function')
    })

    it('should return a Pitch instance', () => {
        expect(pitch.next() instanceof Pitch).toBe(true)
    })

    it('should return correct pitch', () => {
        expect(+pitch.next(12)).toBe(880)
    })
})

describe('previous', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(tuningFrequency)
    })

    it('should be a function', () => {
        expect(typeof pitch.previous).toBe('function')
    })

    it('should return a Pitch instance', () => {
        expect(pitch.previous() instanceof Pitch).toBe(true)
    })

    it('should return correct pitch', () => {
        expect(+pitch.previous(12)).toBe(220)
    })
})

describe('class', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(tuningFrequency)
    })

    it('should be a function', () => {
        expect(typeof pitch.class).toBe('function')
    })

    it('should return a number', () => {
        expect(typeof pitch.class()).toBe('number')
    })

    const pitches = []
    for (var i = -12, n = 13; i < n; i++) {
        pitches.push(new Pitch(tuningFrequency).next(i))
    }

    pitches.forEach((pitch, index) => {
        const value = (9 + index) % 12
        it(`should return ${value}`, () => {
            expect(pitch.class()).toEqual(value)
        })
    })
})

describe('toString', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(tuningFrequency)
    })

    it('should show # accidental when necessary', () => {
        expect(pitch.toString()).toBe('A4')
        expect(pitch.next(1).toString()).toBe('A#4')
    })

    it('should show b accidental when necessary', () => {
        expect(pitch.next(1).toString(true)).toBe('Bb4')
    })
})
