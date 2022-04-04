const express = require('express');
const axios = require('axios');
const token = require('../../../client/src/token.js');

const videosRouter = express.Router();

videosRouter.get('/highlightedvideo', function(req, res) {
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

videosRouter.get('/weeklyhighlights', function(req, res) {
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

videosRouter.get('/dailyhighlights', function(req, res) {
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

videosRouter.get('/fullgamehighlights', function(req, res) {
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


module.exports = videosRouter;