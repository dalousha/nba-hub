const express = require('express');
const axios = require('axios');
const token = require('../../../client/src/token.js');

const tweetsRouter = express.Router()

tweetsRouter.get('/', function(req, res) {
  let params = {
    q: req.query.playerName,
    count: 1
  }
  let authHeaders = {
    'Authorization': `Bearer ${token.twitToken}`
  }
  axios.get(`https://api.twitter.com/1.1/users/search.json`, {params, headers: authHeaders})
  .then(users => users.data[0].id)
  .then(user => axios.get(`https://api.twitter.com/1.1/statuses/user_timeline.json`, { params: { user_id: user, count: 10 }, headers: authHeaders }))
  .then(response => res.send(response.data))
})

module.exports = tweetsRouter;