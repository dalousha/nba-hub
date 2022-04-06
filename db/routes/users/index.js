const express = require('express');
const { registerUser, authUser, getUser } = require('../../controllers/userControllers.js')
const usersRouter = express.Router();

usersRouter.post('/', registerUser)
usersRouter.post('/login', authUser)

usersRouter.get('/', getUser)


module.exports = usersRouter;