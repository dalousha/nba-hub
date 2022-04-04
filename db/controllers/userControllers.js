const asyncHandler = require('express-async-handler');
const User = require ('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body;

  const usernameExists = await User.findOne({ username })
  const emailExists = await User.findOne({ email })

  if (usernameExists || emailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    username,
    email,
    password
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      trackedPlayers: newUser.trackedPlayers
    })
  }
})

module.exports = { registerUser };