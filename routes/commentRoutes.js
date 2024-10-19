const express = require("express");
const commentController = require("../controllers/commentController");

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/comment", commentController.comment_form_get);
commentRouter.get("/comments", commentController.comment_fetch_get);
commentRouter.post("/comments", commentController.comment_create_post);

module.exports = commentRouter;
