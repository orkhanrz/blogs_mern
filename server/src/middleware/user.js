module.exports = {
  validate: (req, res, next) => {
    const errors = {};

    if (req.body.fullname?.length < 1) {
      errors.fullname = "Fullname cannot be empty";
    }

    if (!req.body.email || !req.body.email.includes("@")) {
      errors.email = "Email is not valid!";
    }

    if (!req.body.password || req.body.password.length < 8) {
      errors.password = "Password length has to be more than 7 characters!";
    }

    return Object.keys(errors).length
      ? res.status(400).json({ errors, success: false })
      : next();
  },
};
