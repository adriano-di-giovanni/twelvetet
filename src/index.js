import PitchRegistry from './PitchRegistry'
import { parse } from 'twelvetet-spn'

export default class TwelveTet {
    constructor(frequency = 440) {
        this._pitchRegistry = new PitchRegistry(frequency)
    }

    getPitch(notation) {
        const value = parse(notation)
        return value != null ? this._pitchRegistry.get(value) : null
    }
}
