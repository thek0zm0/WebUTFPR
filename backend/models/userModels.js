import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        email: 
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true,
            minlength: 3
        },
        admin:
        {
            type: Boolean
        }
    }
);

// module.exports = User = mongoose.model("user", userSchema);
export default mongoose.model("user", userSchema);