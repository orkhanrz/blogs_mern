const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  quote: {
    type: String
  },
  image: {
    type: String,
    default: '/public/images/default_user.avif'
  },
  blogs: [
    {
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
