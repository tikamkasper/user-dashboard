const User = require("../models/User");

// Render home page with all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { users });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Render the Add User form
exports.addUserForm = (req, res) => {
  res.render("addUser");
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { username, email, city } = req.body;
    const newUser = new User({ username, email, city });
    await newUser.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Render Edit User form
exports.editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("editUser", { user });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { username, email, city } = req.body;
    await User.findByIdAndUpdate(req.params.id, { username, email, city });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { username, email, city } = req.query;
    const query = {};
    if (username) query.username = new RegExp(username, "i");
    if (email) query.email = new RegExp(email, "i");
    if (city) query.city = new RegExp(city, "i");
    const users = await User.find(query);
    res.render("searchResults", { users });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
