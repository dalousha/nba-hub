const express = require('express');
const trackedPlayersRouter = express.Router();
const { addPlayer, removePlayer } = require('../../controllers/trackedPlayersControllers.js')

trackedPlayersRouter.post('/addOne', addPlayer)
trackedPlayersRouter.post('/removeOne', removePlayer)

module.exports = trackedPlayersRouter;