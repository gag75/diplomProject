import mongoose from '../libs/mongoose'

const siteShema = mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },
    domen: {
        type: String,
        unique: true,
        required: true
    },
    countAdmins: {
        type: Number,
        default: 5
    },
    key: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: 'gleb'
    // }
})

export default mongoose.model('Site', siteShema)
