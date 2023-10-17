const Blog = require('../models/blog');

module.exports = {
    getBlogs: async (req, res, next) => {
        try {
        const blogs = await Blog.find().populate('author', ['fullname', 'email', 'quote', 'image']);

        res.status(200).json({blogs});
        } catch (err){
            next(err);
        };
    },
    addBlog: async (req, res, next) => {
        const {title, subtitle, category, image, text, keywords, length, author, featured} = req.body;

        const newBlog = new Blog({title, subtitle, category, image, text, keywords, length, author, featured});

        try {
            await newBlog.save();

            res.status(201).json({message: 'Blog created!', blog: newBlog});
        } catch (err){
            next(err);
        };
    }
}