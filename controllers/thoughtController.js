const { Thought, User } = require("../models");
const { create } = require("../models/user");

const thoughtController = {
  //Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Get one thought by id
  async getThoughtById(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.userId });

      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;
  
      // Check if the user with the provided username exists
      const dbUserData = await User.findOne({ username });
  
      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this username!" });
      }
  
      // Create the thought and associate it with the user
      const dbThoughtData = await Thought.create({
        thoughtText,
        username,
      });
  
      // Update the user's thoughts array
      dbUserData.thoughts.push(dbThoughtData._id);
      await dbUserData.save();
  
      // Respond with the created thought data
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  // Update a thought by id
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Delete a thought by id
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      const dbUserData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
    // Create a reaction
    async addReaction(req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { reactions: req.body } },
          { new: true }
        );
  
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
  
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // Delete a reaction
    async removeReaction(req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
  
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
  
        res.json({ message: "Reaction successfully deleted!" });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
};

module.exports = thoughtController;
