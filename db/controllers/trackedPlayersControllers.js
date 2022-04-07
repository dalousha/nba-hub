const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');

const addPlayer = asyncHandler(async (req, res) => {
  const {username, playerId} = req.body;
  const user = await User.updateOne({ username }, { $push: { trackedPlayers: playerId } })
  if (user) {
    res.json('player added to tracker list!')
  } else {
    res.json('something went wrong')
  }
})

const removePlayer = asyncHandler(async (req, res) => {
  const {username, playerId} = req.body;
  const user = await User.updateOne({ username }, { $pull: { trackedPlayers: playerId } })
  if (user) {
    res.json('player removed to the tracker list!')
  } else {
    res.json('something went wrong')
  }
})

module.exports = { addPlayer, removePlayer };