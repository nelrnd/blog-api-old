const User = require("../models/user")
const asyncHandler = require("express-async-handler")

exports.user_detail = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findById(userId).exec()
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }
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
