import TwelveTet from '../index'
import Pitch from '../Pitch'

it('should be a function', () => {
    expect(typeof TwelveTet).toBe('function')
})

it('should be a constructor', () => {
    const twelvetet = new TwelveTet()
    expect(twelvetet instanceof TwelveTet).toBe(true)
})

describe('getPitch', () => {
    let twelvetet

    beforeEach(() => {
        twelvetet = new TwelveTet()
    })

    it('should be a function', () => {
        expect(typeof twelvetet.getPitch).toBe('function')
    })

    it('should return a pitch given its scienfic notation', () => {
        expect(twelvetet.getPitch('A4') instanceof Pitch).toBe(true)
    })
})
