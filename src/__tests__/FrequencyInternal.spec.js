import FrequencyInternal from '../FrequencyInternal'
import Interval from '../Interval'

it('should be a function', () => {
    expect(typeof FrequencyInternal).toBe('function')
})

it('should be a constructor', () => {
    const frequency = new FrequencyInternal(440)
    expect(frequency instanceof FrequencyInternal).toBe(true)
})

describe('.next', () => {
    let frequency

    beforeEach(() => {
        frequency = new FrequencyInternal(440)
    })

    it('should be a function', () => {
        expect(typeof frequency.next).toBe('function')
    })

    it('should return a FrequencyInternal instance', () => {
        expect(frequency.next(12) instanceof FrequencyInternal).toBe(true)
    })

    it('should return a new FrequencyInternal instance', () => {
        expect(frequency.next(12)).not.toBe(frequency)
    })

    it('should return next frequency', () => {
        expect(+frequency.next(12)).toBe(880)
    })
})

describe('.previous', () => {
    let frequency

    beforeEach(() => {
        frequency = new FrequencyInternal(440)
    })

    it('should be a function', () => {
        expect(typeof frequency.previous).toBe('function')
    })

    it('should return a FrequencyInternal instance', () => {
        expect(frequency.previous(12) instanceof FrequencyInternal).toBe(true)
    })

    it('should return a new FrequencyInternal instance', () => {
        expect(frequency.previous(12)).not.toBe(frequency)
    })

    it('should return next frequency', () => {
        expect(+frequency.previous(12)).toBe(220)
    })
})

describe('.intervalFrom', () => {
    let frequency

    beforeEach(() => {
        frequency = new FrequencyInternal(440)
    })

    it('should be a function', () => {
        expect(typeof frequency.intervalFrom).toBe('function')
    })

    it('should return a Interval instance', () => {
        expect(frequency.intervalFrom(220) instanceof Interval).toBe(true)
    })

    it('should return correct interval', () => {
        expect(+frequency.intervalFrom(220)).toBe(12)
    })
})

describe('.intervalTo', () => {
    let frequency

    beforeEach(() => {
        frequency = new FrequencyInternal(440)
    })

    it('should be a function', () => {
        expect(typeof frequency.intervalTo).toBe('function')
    })

    it('should return a Interval instance', () => {
        expect(frequency.intervalTo(220) instanceof Interval).toBe(true)
    })

    it('should return correct interval', () => {
        expect(+frequency.intervalTo(220)).toBe(-12)
    })
})

it('should return primitive value', () => {
    const frequency = new FrequencyInternal(440)
    expect(+frequency).toBe(440)
})
