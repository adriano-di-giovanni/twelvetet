import TwelveTet from '../index'
import Pitch from '../Pitch'

it('should be a function', () => {
    expect(typeof TwelveTet).toBe('function')
})

it('should be a constructor', () => {
    expect(new TwelveTet() instanceof TwelveTet).toBe(true)
})

describe('pitch', () => {
    let twelvetet

    beforeEach(() => {
        twelvetet = new TwelveTet()
    })

    it('should be a function', () => {
        expect(typeof twelvetet.pitch).toBe('function')
    })

    it('should return an instance of Pitch', () => {
        expect(twelvetet.pitch(440) instanceof Pitch).toBe(true)
    })
})
