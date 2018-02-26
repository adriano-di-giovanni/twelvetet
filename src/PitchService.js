import { parse } from 'twelvetet-spn'

export default class PitchService {
    constructor(context) {
        this._context = context
    }

    get(notation) {
        const value = parse(notation)
        return value != null ? this._context.pitchRegistry.get(value) : null
    }

    getStandard() {
        return this._context.pitchRegistry.getStandard()
    }
}
