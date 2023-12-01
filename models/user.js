const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: false, length: { min: 2 } },
})

userSchema.virtual("url").get(function () {
  return `/users/${this._id}`
})

module.exports = mongoose.model("User", userSchema)
