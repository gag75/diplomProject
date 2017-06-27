import mongoose from '../libs/mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId;
const historyListSchema = mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    messages: [{
		type: ObjectId,
		ref: 'Message'
	}],
    summarys: [{
		type: ObjectId,
		ref: 'Summary'
	}],
    domen: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        default: new Date()
    }
})

export default  mongoose.model('HistoryList', historyListSchema);
