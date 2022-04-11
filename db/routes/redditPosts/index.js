const express = require('express');
const axios = require('axios');

const redditPostsRouter = express.Router();

redditPostsRouter.get('/', function(req, res) {
  console.log(req.query.playerName)
  let params = {
    q: req.query.playerName,
    sort: 'top',
    limit: 7,
    t: 'week'
  }

  axios.get(`https://www.reddit.com/r/nba/search.json`, {params})
  .then(response => response.data)
  .then(data => res.send(data))

})

module.exports = redditPostsRouter;