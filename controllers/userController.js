const { User, Thought } = require('../models');

const userController = {

    // Get all users
    async getAllUsers(req, res) { 
        try {
            const dbUserData = await User.find().populate('thoughts').populate('friends');
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Get one user by id
    async getUserById(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.id }).populate('thoughts').populate('friends');
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            await Thought.deleteMany({ username: dbUserData.username });
            res.json({ message: 'User deleted successfully!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
