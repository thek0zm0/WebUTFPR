import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: String,
    senha: String,
})

export default mongoose.model('users', schema)