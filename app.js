require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3000

// Connect to db
const mongoDB = process.env.MONGODB_URI
const main = async () => mongoose.connect(mongoDB)
main().catch((err) => console.error(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const commentRouter = require("./routes/comment")

app.get("/", (req, res) => res.json({ message: "Hello World!" }))
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/posts/:postId/comments", commentRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
