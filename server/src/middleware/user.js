module.exports = {
  validate: (req, res, next) => {    
    if (req.body.fullname && req.body.fullname.length < 1) {
      return res
        .status(400)
        .json({ message: "Fullname cannot be empty.", success: false });
    }

    if (!req.body.email || !req.body.email.includes("@")) {
      return res
        .status(400)
        .json({ message: "Email is not valid!", success: false });
    }

    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).json({
        message: "Password length has to be more than 7 characters!",
        success: false,
      });
    }

    next();
  },
};
