const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await User.find();

      res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  },
  getUserBlogs: async (req, res, next) => {
    const userId = req.params.id;

    try {
      const blogs = await Blog.find({ author: userId });

      res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
  },
  signup: async (req, res, next) => {
    const { fullname, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, errors: { email: "User already exists!" } });
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ fullname, email, password: hashPassword });
      // const token = jwt.sign(
      //   { _id: newUser._id, email: newUser.email },
      //   process.env.JWT_SECRET,
      //   { expiresIn: process.env.JWT_EXPIRY }
      // );

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          email: newUser.email,
          fullname: newUser.fullname,
          image: newUser.image,
          quote: newUser.quote,
        },
        message: 'You have successfully signed up!'
      });
    } catch (err) {
      next(err);
    }
  },
  signin: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, errors: { email: "User not found!" } });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res
          .status(401)
          .json({ success: false, errors: { password: "Password is wrong!" } });
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      const signedInUser = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        image: user.image,
        quote: user.quote,
      };

      req.session.token = token;
      req.session.user = signedInUser;

      res.status(200).json({
        success: true,
        user: signedInUser,
        message: 'You have successfully signed in!'
      });
    } catch (err) {
      next(err);
    }
  },
  signout: (req, res, next) => {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({ success: true, message: "Logged out!" });
    });
  },
  editUser: async (req, res, next) => {
    const userId = req.params.userId;
    const { fullname, quote } = req.body;

    try {
      const user = await User.findById(userId);
      const image = req.file ? "/api/uploads/" + req.file.filename : user.image;

      user.fullname = fullname;
      user.quote = quote;
      user.image = image;

      await user.save();

      res.status(200).json({
        success: true,
        user: { fullname: user.fullname, quote: user.quote, image: user.image },
        message: 'Profile updated!'
      });
    } catch (error) {
      next(error);
    }
  },
  verifyToken: (req, res, next) => {
    const token = req.session.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized!", success: false });
    }

    const verification = jwt.verify(token, process.env.JWT_SECRET);

    if (!verification) {
      return res.status(401).json({
        message: "Token is not valid. You are being redirected!",
        success: false,
      });
    }

    res.status(200).json({ success: true, message: "Token is valid!" });
  },
};
