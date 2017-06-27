import mongoose from '../libs/mongoose'

const summarySchema = mongoose.Schema({
    clientId:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

export default  mongoose.model('Summary', summarySchema);
