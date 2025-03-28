import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        lowerCase: true
    },
    age: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User;