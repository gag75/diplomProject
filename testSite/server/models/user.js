import mongoose from '../libs/mongoose'

const userShema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User', userShema)
