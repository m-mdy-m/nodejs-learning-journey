exports.getPosts = (req, res, nxt) => {
  res
    .status(200)
    .json({ posts: [{ title: "POSTS", content: "THIS IS CONTENT POSTS" }] });
};
