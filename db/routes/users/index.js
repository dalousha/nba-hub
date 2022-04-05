const express = require('express');
const { registerUser, authUser } = require('../../controllers/userControllers.js')
const usersRouter = express.Router();

usersRouter.post('/', registerUser)
usersRouter.post('/login', authUser)


module.exports = usersRouter;