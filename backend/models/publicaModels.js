import mongoose from 'mongoose'

const publicaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        text:
        {
            type: String,
            required: true,
        },
        arquivo:
        {
            type: String,
            required: true,
        },
        author: 
        {
            type: String,
            required: true
        }
    }
);

// module.exports = User = mongoose.model("user", userSchema);
export default mongoose.model("publica", publicaSchema);