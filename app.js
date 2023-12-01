const express = require("express")

const app = express()
const PORT = process.env.PORT || 3000

let posts = [
  {
    id: 1,
    title: "How does the internet works?",
    author: "Nel",
    text: "Every computer is connected to one another with cables.",
  },
  {
    id: 2,
    title: "What is the UX design process?",
    author: "Gabe",
    text: "For our product to account for the users it serves, it needs to follow a particular process.",
  },
  {
    id: 3,
    title: "What is a website?",
    author: "Dave",
    text: "You can conceive a website as a series of files in a directory.",
  },
]

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => res.json({ message: "Hello World!" }))

app.get("/posts", (req, res) => {
  res.json(posts)
})

app.get("/posts/:postId", (req, res) => {
  const { postId } = req.params
  const post = posts.find((p) => p.id == postId)
  if (!post) {
    return res.status(404).json({ error: "Post not found" })
  }
  res.json(post)
})

app.post("/posts", (req, res) => {
  const { title, author, text } = req.body
  if (!title || !author || !text) {
    return res.status(400).json({ error: "Invalid fields" })
  }
  const post = { id: posts[posts.length - 1].id + 1, title, author, text }
  posts.push(post)
  res.json(post)
})

app.put("/posts/:postId", (req, res) => {
  const { postId } = req.params
  const { title, author, text } = req.body
  let post = posts.find((p) => p.id == postId)
  post = { ...post, title, author, text }
  posts = posts.map((p) => (p.id == postId ? post : p))
  res.json(post)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
