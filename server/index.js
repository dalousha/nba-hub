const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const corsOptions ={
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const PORT = 3001;

const users = require('../db/routes/users')
const videos = require('../db/routes/videos')
const tweets = require('../db/routes/tweets')

const app = express();

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
  extended: true
}));


// ROUTES

app.use('/videos', videos);

app.use('/tweets', tweets)

app.use('/users', users)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});