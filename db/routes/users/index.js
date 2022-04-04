const express = require('express');
const { registerUser } = require('../../controllers/userControllers.js')
const usersRouter = express.Router();

usersRouter.post('/', registerUser)




module.exports = usersRouter;