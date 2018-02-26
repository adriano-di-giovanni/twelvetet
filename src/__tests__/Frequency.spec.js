import Frequency from '../Frequency'
import Interval from '../Interval'

it('should be a function', () => {
    expect(typeof Frequency).toBe('function')
})

it('should be a constructor', () => {
    const frequency = new Frequency(440)
    expect(frequency instanceof Frequency).toBe(true)
})

describe('.getInterval', () => {
    it('should return an Interval', () => {
        expect(Frequency.getInterval(220, 440) instanceof Interval).toBe(true)
    })

    it('should return correct interval between A3 and A4', () => {
        expect(Frequency.getInterval(220, 440).getSemitones()).toBe(12)
    })

    it('should return correct interval between A4 and A3', () => {
        expect(Frequency.getInterval(440, 220).getSemitones()).toBe(-12)
    })
})
