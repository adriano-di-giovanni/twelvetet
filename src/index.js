import Context from './Context'
import PitchService from './PitchService'

export default class TwelveTet {
    constructor(frequency = 440) {
        const context = new Context(frequency)
        this.pitch = new PitchService(context)
    }
}

export Frequency from './Frequency'
