const example = require('../models/example')
exports.getPosts = (req, res, nxt) => {
  res
    .status(200)
    .json({ posts: [{ title: "POSTS", content: "THIS IS CONTENT POSTS" }] });
};
exports.createPost = async (req, res, nxt) => {
  const _one = req.body._one;
  const _two = req.body._two;
  const _creator = req.body._creator;
  const newDoc = new example({
    _one: _one,
    _two : _two,
    _creator:{
      name : "Test",
      phone : "9892221451",
    }
  })
  const create = await newDoc.save()
  res.status(200).json({
    message: "Post create",

    post: create,
  })
};
