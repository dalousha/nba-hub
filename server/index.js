const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser')

const corsOptions ={
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const PORT = 3001;

const videos = require('../db/routes/videos')
const tweets = require('../db/routes/tweets')

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json())


// ROUTES

app.use('/videos', videos);

app.use('/tweets', tweets)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});