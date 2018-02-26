import PitchRegistry from './PitchRegistry'

export default class Context {
    constructor(frequency) {
        this.pitchRegistry = new PitchRegistry(frequency)
    }
}
