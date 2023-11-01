const path = require('path');

module.exports = {
  validate: (req, res, next) => {
    const { title, subtitle, category, text, keywords, length } = req.body;
    const image = req.file;
    const errors = {};

    if (!title) {
      errors.title = "Title cannot be empty";
    }

    if (!subtitle) {
      errors.subtitle = "Subtitle cannot be empty!";
    }

    if (!category) {
      errors.category = "Category cannot be empty!";
    }

    if (!text) {
      errors.text = "Text cannot be empty!";
    }

    if (!keywords) {
      errors.keywords = "Keywords cannot be empty!";
    }

    if (!length) {
      errors.length = "Length cannot be empty!";
    }

    if (!image) {
      errors.image = "Please upload a file!";
    }

    if (image) {
      const ext = path.extname(image.filename);

      if (
        ext !== ".png" &&
        ext !== ".jpg" &&
        ext !== ".gif" &&
        ext !== ".jpeg"
      ) {
        errors.image = "Please provide a valid image!";
      }
    }

    return Object.keys(errors).length
      ? res.status(422).json({ errors, success: false })
      : next();
  },
};
