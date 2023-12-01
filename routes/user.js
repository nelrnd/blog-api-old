const express = require("express")
const Router = express.Router()
const userController = require("../controllers/userController")

Router.post("/", userController.user_create)

Router.get("/:userId", userController.user_detail)

Router.put("/:userId", userController.user_update)

Router.delete("/:userId", userController.user_delete)

module.exports = Router
