import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, min: 2, max: 50, },
  lastName: { type: String, required: true, min: 2, max: 50, },
  email: { type: String, required: true, max: 50, unique: true },
  password: { type: String, required: true, max: 50, min: 6 },
  picturePath: { type: String, default: '' },
  firends: { type: Array, default: [] },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impression: Number,



},
  { timestamps: true }
)
const User = mongoose.model("User", UserSchema)

export default User
