const express = require("express")
const Router = express.Router()
const authController = require("../controllers/authController")

Router.post("/register", authController.auth_register, authController.auth_login)

Router.post("/login", authController.auth_login)

Router.post("/logout", authController.auth_logout)

module.exports = Router
