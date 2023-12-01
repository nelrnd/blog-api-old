const express = require("express")
const Router = express.Router({ mergeParams: true })
const commentController = require("../controllers/commentController")

Router.get("/", commentController.comment_list)

Router.get("/:commentId", commentController.comment_detail)

Router.delete("/:commentId", commentController.comment_delete)

module.exports = Router
