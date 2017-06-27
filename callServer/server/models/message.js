import mongoose from '../libs/mongoose'

const messageSchema = mongoose.Schema({
    clientId:{
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

export default  mongoose.model('Message', messageSchema);
