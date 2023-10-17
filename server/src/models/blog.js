const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  keywords: String,
  likes: {
    type: Number,
    default: 0,
  },
  length: Number,
  views: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      authorId: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("Blog", BlogSchema);
