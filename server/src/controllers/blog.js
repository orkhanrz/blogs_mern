const Blog = require("../models/blog");

module.exports = {
  getBlogs: async (req, res, next) => {
    try {
      const blogs = await Blog.find().populate("author", [
        "fullname",
        "email",
        "quote",
        "image",
      ]);

      res.status(200).json({ blogs });
    } catch (err) {
      next(err);
    }
  },
  addBlog: async (req, res, next) => {
    const { title, subtitle, category, text, keywords, length, featured } =
      req.body;
    const author = req.session.user._id;
    const image = "/uploads/" + req.file.filename;

    const newBlog = new Blog({
      title,
      subtitle,
      category,
      image,
      text,
      keywords,
      length,
      author,
      featured,
    });

    try {
      await newBlog.save();

      res.status(201).json({ success: true, blog: newBlog });
    } catch (err) {
      next(err);
    }
  },
  getBlog: async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id)
        .populate("comments.authorId", ["image", "fullname", "quote"])
        .populate("author", ["image", "fullname", "quote"]);

      return res.status(200).json(blog);
    } catch (err) {
      next(err);
    }
  },
  addComment: async (req, res, next) => {
    const blogId = req.params.id;
    const { message } = req.body;
    const comment = { text: message, authorId: req.session.user._id };

    if (!message) {
      return res
        .status(422)
        .json({ success: false, message: "Please type your comment" });
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { comments: comment },
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "Comment Added",
        blog: updatedBlog,
      });
    } catch (err) {
      next(err);
    }
  },
};
