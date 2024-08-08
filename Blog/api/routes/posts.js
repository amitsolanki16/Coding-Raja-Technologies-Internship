const router = require("express").Router();
const Post = require("../models/Post");
const newComment = require("../models/Comments");

// Create new post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Post
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Posts
router.get("/", async (req, res) => {
    try {
        const allPost = await Post.find();
        res.status(200).json(allPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post Comment
router.post("/:id/comments", async (req, res) => {
    console.log(req.body.text);
    try {
        const enteredComment = new newComment({
            text: req.body.text
        });
        enteredComment.save((err, comment) => {
            if (err) {
                return res.status(500).json(err);
            }
            Post.findById(req.params.id, (err, post) => {
                if (err) {
                    return res.status(500).json(err);
                }
                post.comments.push(comment);
                post.save();
                res.status(200).json(comment);
            });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Comments
router.get("/:id/comments", (req, res) => {
    console.log(req.params.id);
    Post.findById(req.params.id).populate("comments").exec((err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(result);
    });
});

// DELETE Post
router.delete("/:id", async (req, res) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(204).send(); // No content
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;