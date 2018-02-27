import TwelveTet from '../index'

it('should be a function', () => {
    expect(typeof TwelveTet).toBe('function')
})

it('should be a contructor', () => {
    const twelvetet = new TwelveTet()
    expect(twelvetet instanceof TwelveTet).toBe(true)
})

describe('.pitch', () => {
    let twelvetet

    beforeEach(() => {
        twelvetet = new TwelveTet()
    })

    it('should throw when value is missing', () => {
        expect(() => {
            twelvetet.pitch()
        }).toThrowError(/Missing or invalid/)
    })

    it('should accept a string value', () => {
        expect(() => {
            twelvetet.pitch('A4')
        }).not.toThrow()
    })

    it('should accept a number value', () => {
        expect(() => {
            twelvetet.pitch(880)
        }).not.toThrow()
    })

    it('should handle scientific pitch notation', () => {
        expect(+twelvetet.pitch('A4')).toBe(440)
    })

    it('should handle frequency', () => {
        expect(+twelvetet.pitch(440)).toBe(440)
    })
})
