const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');

// Create a new post
router.post('/post', async (req, res) => {
  try {
    const newPost = new Posts(req.body);
    await newPost.save();
    res.status(201).json({ success: 'Post Saved Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Posts.find().exec();
    res.status(200).json({ success: true, existingPosts: posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get a specific post

router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    return res.status(200).json({ success: true, post });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Update a post
router.put('/post/update/:id', async (req, res) => {
  try {
    await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
    res.status(200).json({ success: 'Update Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a post
router.delete('/post/delete/:id', async (req, res) => {
  try {
    const deletePost = await Posts.findByIdAndRemove(req.params.id).exec();
    if (!deletePost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Delete Successful', deletePost });
  } catch (error) {
    res.status(400).json({ message: 'Delete unsuccessful', error: error.message });
  }
});

router.post('/post/save', async (req, res) => {
  try {
    const newPost = new Posts(req.body);

    const savedPost = await newPost.save();

    res.json({ message: 'Save Successful', newPost: savedPost });
  } catch (error) {
    res.status(400).json({ message: 'Save unsuccessful', error: error.message });
  }
});

module.exports = router;
