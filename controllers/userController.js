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
            const dbUserData = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
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
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true });
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
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
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
    // Add a friend
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
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
    // Remove a friend
    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

module.exports = userController;
