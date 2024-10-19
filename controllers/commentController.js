const Comment = require("../models/comment");

// Render comment form
const comment_form_get = (req, res) => {
  const { blogId } = req.params;
  const { parentId } = req.query;
  res.render("leaveCommentForm", {
    blogId,
    parentId,
    title: "Leave a Comment",
  });
};

// Fetch comments for a specific blog post
const comment_fetch_get = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blogId, parentId: null })
      .populate({
        path: "replies",
        populate: {
          path: "replies", // Deep populate for multi-level replies
          populate: { path: "replies" },
        },
      })
      .exec();
    res.json(comments); // Send the comments as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Add a comment or reply
const comment_create_post = async (req, res) => {
  const { blogId } = req.params;
  const { commenter, comment, parentId } = req.body;

  try {
    const newComment = new Comment({
      blogId,
      commenter,
      comment,
      parentId: parentId || null,
    });
    const savedComment = await newComment.save();

    // If it's a reply, add the new comment to the parent's 'replies' array
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      parentComment.replies.push(savedComment._id);
      await parentComment.save();
    }

    res.status(201).json({ message: "Comment added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

module.exports = {
  comment_form_get,
  comment_fetch_get,
  comment_create_post,
};
