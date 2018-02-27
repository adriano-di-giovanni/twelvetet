import Frequency from '../Frequency'

it('should be a function', () => {
    expect(typeof Frequency).toBe('function')
})

it('should be a constructor', () => {
    expect(new Frequency(220, 440) instanceof Frequency).toBe(true)
})

describe('offset', () => {
    it('should have no offset when frequency is in tune', () => {
        expect(+new Frequency(220, 440).offset()).toBe(0)
    })

    it('should have offset when frequency is out of tune', () => {
        expect(+new Frequency(221, 440).offset()).not.toBe(0)
    })
})

describe('next', () => {
    it('should return a new Frequency', () => {
        const frequency = new Frequency(220, 440)
        expect(frequency.next()).not.toBe(frequency)
    })

    it('should move forward', () => {
        expect(new Frequency(220, 440).next(12)).toEqual(new Frequency(440, 440))
    })

    it('should move backward', () => {
        expect(new Frequency(220, 440).next(-12)).toEqual(new Frequency(110, 440))
    })
})

describe('previous', () => {
    it('should return a new Frequency', () => {
        const frequency = new Frequency(220, 440)
        expect(frequency.previous()).not.toBe(frequency)
    })

    it('should move forward', () => {
        expect(new Frequency(220, 440).previous(12)).toEqual(new Frequency(110, 440))
    })

    it('should move backward', () => {
        expect(new Frequency(220, 440).previous(-12)).toEqual(new Frequency(440, 440))
    })
})

it('should return the primive value of Frequency', () => {
    expect(+new Frequency(440, 440)).toBe(440)
})

it('should move to next tuned frequency even when starting frequency is sharp', () => {
    expect(+new Frequency(221, 440).next(12)).toBe(440)
})

it('should move to next tuned frequency even when starting frequency is flat', () => {
    expect(+new Frequency(219, 440).next(12)).toBe(440)
})
