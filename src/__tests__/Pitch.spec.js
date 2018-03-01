import Pitch from '../Pitch'

it('should be defined', () => {
    expect(Pitch).toBeDefined()
})

it('should be a function', () => {
    expect(typeof Pitch).toBe('function')
})

it('should be a constructor', () => {
    expect(new Pitch(440, 440) instanceof Pitch).toBe(true)
})

describe('valueOf', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(438, 440)
    })

    it('should return primitive value', () => {
        expect(+pitch).toBe(440)
    })
})

describe('class', () => {
    it('should be a function', () => {
        expect(typeof new Pitch(440, 440).class).toBe('function')
    })

    let i = -12
    while (i <= 12) {
        it('should return an integer between 0 and 11', () => {
            const classValue = new Pitch(440, 440).next(i).class()
            expect(Number.isInteger(classValue)).toBe(true)
            expect(classValue).toBeGreaterThanOrEqual(0)
            expect(classValue).toBeLessThanOrEqual(11)
        })
        i++
    }
})

describe('octave', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(440, 440)
    })

    it('should return correct value', () => {
        expect(pitch.octave()).toBe(4)
    })
})

describe('offset', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(221, 440)
    })

    it('should return correct value', () => {
        expect(pitch.offset()).not.toBe(0)
    })
})

describe('next', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(440, 440)
    })

    it('should return correct value', () => {
        expect(+pitch.next(12)).toBe(880)
    })
})

describe('previous', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(440, 440)
    })

    it('should return correct value', () => {
        expect(+pitch.previous(12)).toBe(220)
    })
})

describe('intervalTo', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(440, 440)
    })

    it('should be defined', () => {
        expect(pitch.intervalTo).toBeDefined()
    })

    it('should be a function', () => {
        expect(typeof pitch.intervalTo).toBe('function')
    })

    it('should return a number', () => {
        expect(typeof pitch.intervalTo(pitch.next())).toBe('number')
    })

    it('should return correct value when argument is a Pitch instance', () => {
        expect(pitch.intervalTo(pitch.next(12))).toBe(12)
    })

    it('should return correct value when argument is scientific pitch notation', () => {
        expect(pitch.intervalTo('A5')).toBe(12)
    })

    it('should return correct value when argument is a frequency', () => {
        expect(pitch.intervalTo(880)).toBe(12)
    })

    it('should return interval to normalized frequency', () => {
        expect(pitch.intervalTo(878)).toBe(12)
    })
})

describe('intervalFrom', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(440, 440)
    })

    it('should be defined', () => {
        expect(pitch.intervalFrom).toBeDefined()
    })

    it('should be a function', () => {
        expect(typeof pitch.intervalFrom).toBe('function')
    })

    it('should return a number', () => {
        expect(typeof pitch.intervalFrom(pitch.next())).toBe('number')
    })

    it('should return correct value when argument is a Pitch instance', () => {
        expect(pitch.intervalFrom(pitch.next(12))).toBe(-12)
    })

    it('should return correct value when argument is scientific pitch notation', () => {
        expect(pitch.intervalFrom('A5')).toBe(-12)
    })

    it('should return correct value when argument is a frequency', () => {
        expect(pitch.intervalFrom(880)).toBe(-12)
    })

    it('should return interval to normalized frequency', () => {
        expect(pitch.intervalFrom(878)).toBe(-12)
    })
})

describe('toString', () => {
    ;['A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5'].forEach(
        (value, index) => {
            it('should return scientific pitch notation using sharp enharmonic equivalents', () => {
                expect(new Pitch(440, 440).next(index).toString()).toBe(value)
            })
        }
    )
    ;['A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5'].forEach(
        (value, index) => {
            it('should return scientific pitch notation using flat enharmonic equivalents', () => {
                expect(new Pitch(440, 440).next(index).toString(true)).toBe(value)
            })
        }
    )
})

describe('equals', () => {
    let pitch

    beforeEach(() => {
        pitch = new Pitch(440, 440)
    })

    it('should be a function', () => {
        expect(typeof pitch.equals).toBe('function')
    })

    it('should return true when pitches are equal', () => {
        expect(pitch.equals(pitch)).toBe(true)
    })

    it("should return true false pitches aren't equal", () => {
        expect(pitch.equals(pitch.next())).toBe(false)
    })
})
