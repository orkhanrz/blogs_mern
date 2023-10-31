const Blog = require("../models/blog");

module.exports = {
  getBlogs: async (req, res, next) => {
    const {limit, page, featured} = req.query;
    const skip = (page * limit) - limit;
    let featuredBlogs = [];

    try {
      const blogsLength = await Blog.countDocuments();
      const blogs = await Blog.find().skip(skip).limit(limit).populate("author", [
        "fullname",
        "email",
        "quote",
        "image",
      ]);

      if (featured){
        featuredBlogs = await Blog.find().sort({likes: -1}).limit(5).populate("author", [
          "fullname",
          "email",
          "quote",
          "image",
        ]);
      }

      res.status(200).json({ blogs, featured: featuredBlogs, length:  blogsLength});
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
    const { user } = req.session;
    const comment = { text: message, authorId: user._id };

    if (!message) {
      return res
        .status(422)
        .json({ success: false, message: "Please type your comment" });
    }

    try {
      await Blog.findByIdAndUpdate(blogId, {
        $push: { comments: comment },
      });

      res.status(201).json({
        success: true,
        comment: {
          authorId: {
            _id: user._id,
            fullname: user.fullname,
            quote: user.quote,
            image: user.image,
          },
          text: message,
          date: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },
  deleteComment: async (req, res, next) => {
    const blogId = req.params.id;
    const commentId = req.params.commentId;

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { comments: { _id: commentId } } },
        { safe: true, new: true }
      );

      res.status(200).json({ success: true, updatedBlog });
    } catch (err) {
      next(err);
    }
  },
  likeBlog: async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.params.userId;

    try {
      const blog = await Blog.findById(blogId);

      if (blog.likes.users.includes(userId)) {
        blog.likes.count = blog.likes.count - 1;
        blog.likes.users = blog.likes.users.filter((user) => user != userId);
      } else {
        blog.likes.count = blog.likes.count + 1;
        blog.likes.users.push(userId);
      }

      await blog.save();

      return res.status(200).json({ success: true, blog });
    } catch (err) {
      next(err);
    }

    res.status(201).json({ success: true });
  },
};
