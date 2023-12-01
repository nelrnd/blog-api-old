const Comment = require("../models/comment")
const asyncHandler = require("express-async-handler")

exports.comment_list = asyncHandler(async (req, res, next) => {
  const { postId } = req.params
  const allComments = await Comment.find({ post: postId }).populate("author").exec()
  res.json(allComments)
})

exports.comment_detail = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params
  const comment = await Comment.findById(commentId).exec()
  res.json(comment)
})

exports.comment_delete = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params
  await Comment.findByIdAndDelete(commentId)
  res.json({ message: "Comment deleted" })
})
