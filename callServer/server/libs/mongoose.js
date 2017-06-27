import mongoose from 'mongoose'
import config from '../config'

mongoose.Promise = global.Promise

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'))

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
    console.log('Connect mongodb');
});

export default mongoose
