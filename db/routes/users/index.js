const express = require('express');

const usersRouter = express.Router();

usersRouter.post('/', function(req, res) {
  console.log(req.body)
})




module.exports = usersRouter;