const User = require('../models/user');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
        const users = await User.find();

        res.status(200).json({users});
        } catch (err){
            next(err);
        };
    },
    signup: async (req, res, next) => {
        const {fullname, email, password, quote, image} = req.body;

        const newUser = new User({fullname, email, password, quote, image});

        try {
            await newUser.save();

            res.status(201).json({message: 'user created!', user: newUser});
        } catch (err){
            next(err);
        };
    }
}