import { DB_URL } from './variables';
import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(DB_URL);
    console.log("DB Up and running")
})