require("dotenv").config()
const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.auth_register = asyncHandler(async (req, res, next) => {
  const { username, email, password, bio } = req.body
  const user = new User({ username, email, password, bio })
  await user.save()
  next()
})

exports.auth_login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email }).exec()
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" })
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(400).json({ error: "Invalid email or password" })
  }
  const secret = process.env.SECRET
  const token = jwt.sign({ email }, secret)
  return res.status(200).json({ message: "Auth succeed", token })
})

exports.auth_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
  })
}
