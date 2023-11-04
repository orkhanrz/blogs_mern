const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

const blogController = require("../controllers/blog");
const userMiddleware = require("../middleware/user");
const blogMiddleware = require("../middleware/blog");

router.get("/", blogController.getBlogs);

router.delete("/:id", userMiddleware.isAuth, blogController.deleteBlog);

router.patch(
  "/:id",
  userMiddleware.isAuth,
  upload.single("image"),
  blogMiddleware.validate,
  blogController.editBlog
);

router.get("/:id", blogController.getBlog);

router.post(
  "/",
  userMiddleware.isAuth,
  upload.single("image"),
  blogMiddleware.validate,
  blogController.addBlog
);

router.post("/:id/comments", userMiddleware.isAuth, blogController.addComment);

router.delete(
  "/:id/comments/:commentId",
  userMiddleware.isAuth,
  blogController.deleteComment
);

router.patch(
  "/:id/likes/:userId",
  userMiddleware.isAuth,
  blogController.likeBlog
);

module.exports = router;
