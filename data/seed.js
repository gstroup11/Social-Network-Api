/// data/seed.js
const db = require('../config/connection');
const thoughtsData = require('./thoughtsData');
const usersData = require('./usersData');
const Thought = require('../models/thought');
const User = require('../models/user');

async function seedDatabase() {
  try {
    await Thought.deleteMany();
    await User.deleteMany();

    // Step 1: Insert thoughts into the database
    const thoughts = await Thought.insertMany(thoughtsData);

    // Step 2: Update usersData to include thought ObjectIds
    const usersWithThoughts = usersData.map(userData => {
      const userThoughts = thoughts
        .filter(thought => thought.username === userData.username)
        .map(thought => thought._id);

      return {
        ...userData,
        thoughts: userThoughts,
      };
    });

    // Insert users with associated thoughts into the database
    await User.insertMany(usersWithThoughts);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();

