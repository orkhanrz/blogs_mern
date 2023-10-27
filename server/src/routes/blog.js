const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

const blogController = require("../controllers/blog");
const userMiddleware = require("../middleware/user");
const blogMiddleware = require("../middleware/blog");

router.get("/", blogController.getBlogs);

router.get('/:id', blogController.getBlog);

router.post(
  "/",
  userMiddleware.isAuth,
  upload.single("image"),
  blogMiddleware.validate,
  blogController.addBlog
);

router.post('/:id/comment', userMiddleware.isAuth, blogController.addComment);

module.exports = router;
