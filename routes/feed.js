const express = require('express')
const feedController = require('../controllers/feed')
const route = express.Router()
// GET / feed/posts
route.get('/posts', feedController.getPosts)


// POST / feed/post
route.post('/post', feedController.createPost)
module.exports = route