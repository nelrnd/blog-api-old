const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
  published: { type: Boolean, required: true },
})

postSchema.virtual("url").get(function () {
  return `/posts/${this._id}`
})

module.exports = mongoose.model("Post", postSchema)
