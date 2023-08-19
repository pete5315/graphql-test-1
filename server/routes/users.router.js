const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// Define your routes and endpoints
app.get("/users", async (req, res) => {
  // Get all users
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  // Create a new user
  const newUser = new User({
    name: req.body.name,
    age: req.body.age,
  });
  await newUser.save();
  res.json(newUser);
});

app.put("/users/:id", async (req, res) => {
  // Update a user by ID
  const user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.age = req.body.age;
  await user.save();
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  // Delete a user by ID
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = usersRouter