const express = require("express");
const db = require("./config/connection"); // Import the connection directly
const seedDatabase = require("./data/seed");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once("open", () => {
  console.log("Connected to MongoDB");
  seedDatabase();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
