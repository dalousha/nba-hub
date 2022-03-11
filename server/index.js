const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser')
const axios = require('axios');

const twitToken = 'AAAAAAAAAAAAAAAAAAAAAN0RZwEAAAAAOz6zadfC74nCuZT99Xz20OVCtZk%3DPo77xsk2e0MEMLTisGH3xyZDGPcKUsoTeUz1RTBOEp7ounkKAY'


const corsOptions ={
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const PORT = 3001;

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json())

app.get('/tweets', function(req, res) {
  let params = {
    q: req.query.playerName,
    count: 1
  }
  let authHeaders = {
    'Authorization': `Bearer ${twitToken}`
  }
  axios.get(`https://api.twitter.com/1.1/users/search.json`, {params, headers: authHeaders})
  .then(users => users.data[0].id)
  .then(user => axios.get(`https://api.twitter.com/1.1/statuses/user_timeline.json`, { params: { user_id: user, count: 10 }, headers: authHeaders }))
  .then(response => res.send(response.data))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});