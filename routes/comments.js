const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const users = require("../data/users");

// GET /comments - get all comments (optionally filtered by postId)
router.get("/", (req, res) => {
  const { postId } = req.query;

  let filtered = comments;

  if (postId) {
    filtered = comments.filter(c => c.postId === parseInt(postId));
  }

  const enhanced = filtered.map(comment => {
    const user = users.find(u => u.id === comment.userId);
    return {
      ...comment,
      author: user ? user.name : "Unknown",
      avatar: user ? user.avatar : "❓"
    };
  });

  res.json(enhanced);
});

// POST /comments - add a new comment
router.post("/", (req, res) => {
    const { postId, userId, text } = req.body;
  
    if (!postId || !userId || !text) {
      return res.status(400).json({ message: "postId, userId, and text are required" });
    }
  
    const newComment = {
      id: comments.length + 1,
      postId,
      userId,
      text
    };
  
    comments.push(newComment);
    res.status(201).json(newComment);
  });

module.exports = router;
