const User = require("../models/user")
const asyncHandler = require("express-async-handler")

exports.user_create = asyncHandler(async (req, res, next) => {
  const { username, email, bio } = req.body
  const user = new User({ username, email, bio })
  await user.save()
  res.json(user)
})

exports.user_detail = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findById(userId).exec()
  res.json(user)
})

exports.user_update = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const { username, email, bio } = req.body
  const updatedUser = new User({ _id: userId, username, email, bio })
  await User.findByIdAndUpdate(userId, updatedUser)
  res.json(updatedUser)
})

exports.user_delete = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  await User.findByIdAndDelete(userId)
  res.json({ message: "User deleted" })
})
