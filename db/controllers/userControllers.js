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
  } else {
   res.status(400);
   throw new Error('Error Occured!')
  }
})

const authUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    console.log('matched')
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      trackedPlayers: user.trackedPlayers
    })
  } else {
    console.log('no match')
    res.status(400)
    throw new Error("Invalid username or password")
  }

})

module.exports = { registerUser, authUser };