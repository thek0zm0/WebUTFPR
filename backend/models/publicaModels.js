import mongoose from 'mongoose'

const publicaSchema = new mongoose.Schema(
    {
        text: 
        {
            type: String,
            required: true,
        },
        image:
        {
            type: String,
            required: true,
        },
        video:
        {
            type: String,
            required: true,
        }
    }
);

// module.exports = User = mongoose.model("user", userSchema);
export default mongoose.model("publica", publicaSchema);