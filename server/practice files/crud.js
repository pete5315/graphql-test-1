const express = require("express");
const mongoose = require("mongoose");
const uri = require("../../atlas_uri");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the MongoDB Atlas database
mongoose.connect(
  `${uri}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define your routes and endpoints here
// Create a schema for your MongoDB documents
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});