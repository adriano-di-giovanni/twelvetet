import Interval from '../Interval'

it('should be a function', () => {
    expect(typeof Interval).toBe('function')
})

it('should be a constructor', () => {
    const interval = new Interval(1)
    expect(interval instanceof Interval).toBe(true)
})

describe('semitones', () => {
    let interval

    beforeEach(() => {
        interval = new Interval(12)
    })

    it('should be a function', () => {
        expect(typeof interval.semitones).toBe('function')
    })

    it('should return a number', () => {
        expect(typeof interval.semitones()).toBe('number')
    })

    it('should match value of argument to constructor', () => {
        expect(interval.semitones()).toBe(12)
    })
})

describe('octaves', () => {
    let interval

    beforeEach(() => {
        interval = new Interval(12)
    })

    it('should be a function', () => {
        expect(typeof interval.octaves).toBe('function')
    })

    it('should return a number', () => {
        expect(typeof interval.octaves()).toBe('number')
    })

    it('should return correct interval', () => {
        expect(interval.octaves()).toBe(1)
    })
})

describe('cents', () => {
    let interval

    beforeEach(() => {
        interval = new Interval(12)
    })

    it('should be a function', () => {
        expect(typeof interval.cents).toBe('function')
    })

    it('should return a number', () => {
        expect(typeof interval.cents()).toBe('number')
    })

    it('should return correct interval', () => {
        expect(interval.cents()).toBe(1200)
    })
})

it('should return primitive value', () => {
    const interval = new Interval(1)
    expect(+interval).toBe(1)
})
