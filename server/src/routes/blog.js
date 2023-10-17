const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog');

router.get('/', blogController.getBlogs);

router.post('/', blogController.addBlog);

module.exports = router;