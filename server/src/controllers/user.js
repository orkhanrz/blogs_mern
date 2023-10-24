const User = require("../models/user");
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
  signup: async (req, res, next) => {
    const { fullname, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "User already exists!" });
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ fullname, email, password: hashPassword });
      const token = jwt.sign(
        { _id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          email: newUser.email,
          fullname: newUser.fullname,
          image: newUser.image,
        },
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
          .json({ success: false, message: "User not found!" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Password is wrong!" });
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      req.session.token = token;
      req.session.user = user;

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          image: user.image,
        },
      });
    } catch (err) {
      next(err);
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
      return res
        .status(401)
        .json({
          message: "Token is not valid. You are being redirected!",
          success: false,
        });
    }

    res.status(200).json({ success: true, message: "Token is valid!" });
  },
  signout: (req, res, next) => {
    req.session.destroy(function(err){
      if (err){
        console.log(err);
        return res.status(500).json({success: false, message: err.message})
      };

      res.status(200).json({success: true, message: 'Logged out!'});
    });
  }
};
