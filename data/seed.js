// data/seed.js
const db = require('../config/connection');
const thoughtsData = require('./thoughtsData');
const usersData = require('./usersData');
const Thought = require('../models/thought');
const User = require('../models/user');

async function seedDatabase() {
  try {
    await Thought.deleteMany();
    await User.deleteMany();

    await User.insertMany(usersData);
    await Thought.insertMany(thoughtsData);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } 
}

seedDatabase();

