const Post = require("../models/post")
const asyncHandler = require("express-async-handler")

exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().exec()
  res.json(allPosts)
})

exports.post_create = asyncHandler(async (req, res, next) => {
  const { title, author, body, published } = req.body
  const post = new Post({ title, author, body, published })
  await post.save()
  res.json(post)
})

exports.post_detail = asyncHandler(async (req, res, next) => {
  const { postId } = req.params
  const post = await Post.findById(postId).exec()
  res.json(post)
})

exports.post_update = asyncHandler(async (req, res, next) => {
  const { postId } = req.params
  const { title, author, body, timestamp, published } = req.body
  const updatedPost = new Post({ _id: postId, title, author, body, timestamp, published })
  await Post.findByIdAndUpdate(postId, updatedPost)
  res.json(updatedPost)
})

exports.post_delete = asyncHandler(async (req, res, next) => {
  const { postId } = req.params
  await Post.findByIdAndDelete(postId)
  res.json({ message: "Post deleted" })
})
