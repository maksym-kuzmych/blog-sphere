const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  commenter: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
