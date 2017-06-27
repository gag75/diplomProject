import mongoose from '../libs/mongoose'

const clientCallServerShema = mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    peerId: {
        type: String,
        required: true,
        unique: true
    },
    domen: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'user'
    },
    socket: {
        type: String,
        default: ' '
    },
    busy: {
        type: Boolean,
        default: false
    },
    busyWith: {
        type: 'String',
        default:' '
    }
})

export default mongoose.model('ClientCallServer', clientCallServerShema)
