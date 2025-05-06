import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    photo: {type: String, required: true},
    otp: { type: Number, default: null }
})

export default mongoose.model.Users || mongoose.model("Users", userSchema)
