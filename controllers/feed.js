exports.getPosts = (req, res, nxt) => {
  res
    .status(200)
    .json({ posts: [{ title: "POSTS", content: "THIS IS CONTENT POSTS" }] });
};
exports.createPost = (req, res, nxt) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: "Post create",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
