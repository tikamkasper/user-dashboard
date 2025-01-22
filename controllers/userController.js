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
  // console.log(req.query);
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

//Global search users
exports.globalSearchUsers = async (req, res) => {
  console.log("=====req.query", req.query);

  const { q = "", ...fields } = req.query;
  console.log(q, fields);

  // Helper function to build regex filters for a sentence
  const buildFilters = (sentence) => {
    const words = sentence.split(" ").map((word) => word.trim());
    const regexFilters = words.map((word) => ({
      $or: [
        { username: new RegExp(word, "i") },
        { email: new RegExp(word, "i") },
        { city: new RegExp(word, "i") },
      ],
    }));
    return { $or: regexFilters };
  };

  const filters = buildFilters(q);

  // Field-based specific filters
  for (const key in fields) {
    if (fields[key]) {
      filters[key] = new RegExp(fields[key], "i"); // Case-insensitive search
    }
  }
  console.log("filters", filters);
  try {
    const users = await User.find(filters);
    const usersCount = users.length;
    res.json({ usersCount, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
