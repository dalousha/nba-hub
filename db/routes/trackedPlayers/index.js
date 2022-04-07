const express = require('express');
const trackedPlayersRouter = express.Router();
const { addPlayer } = require('../../controllers/trackedPlayersControllers.js')

trackedPlayersRouter.post('/', addPlayer)

module.exports = trackedPlayersRouter;