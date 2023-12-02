const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, required: false, length: { min: 2 } },
})

userSchema.virtual("url").get(function () {
  return `/users/${this._id}`
})

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password)
  return match
}

module.exports = mongoose.model("User", userSchema)
