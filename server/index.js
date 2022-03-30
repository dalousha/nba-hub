const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser')
const axios = require('axios');

const token = require('../client/src/token.js')

const corsOptions ={
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const PORT = 3001;

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json())

app.get('/videos/weeklyhighlights', function(req, res) {
  let params = {
    key: token.youtubeAPI,
    part: 'snippet',
    q: 'allintitle: "week"',
    channelId: 'UCWJ2lWNubArHWmf3FIHbfcQ',
    maxResults: 5,
    order: 'date',
    type: 'video'
  }
  axios.get('https://www.googleapis.com/youtube/v3/search', { params })
  .then(videos => res.send(videos.data.items))
})

app.get('/videos/dailyhighlights', function(req, res) {
  let params = {
    key: token.youtubeAPI,
    part: 'snippet',
    q: 'allintitle: "of the night"',
    channelId: 'UCWJ2lWNubArHWmf3FIHbfcQ',
    maxResults: 5,
    order: 'date',
    type: 'video'
  }
  axios.get('https://www.googleapis.com/youtube/v3/search', { params })
  .then(videos => res.send(videos.data.items))
})

app.get('/videos/fullgamehighlights', function(req, res) {
  let params = {
    key: token.youtubeAPI,
    part: 'snippet',
    q: 'allintitle: "Full Game Highlights"',
    channelId: 'UCWJ2lWNubArHWmf3FIHbfcQ',
    maxResults: 5,
    order: 'date',
    type: 'video'
  }
  axios.get('https://www.googleapis.com/youtube/v3/search', { params })
  .then(videos => res.send(videos.data.items))
})

app.get('/videos/highlightedvideo', function(req, res) {
  let params = {
    key: token.youtubeAPI,
    part: 'snippet',
    channelId: 'UC-XWpctw55Q6b_AHo8rkJgw',
    maxResults: 1,
    order: 'date',
    type: 'video'
  }
  axios.get('https://www.googleapis.com/youtube/v3/search', { params })
  .then(videos => res.send(videos.data.items))
})

app.get('/tweets', function(req, res) {
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});