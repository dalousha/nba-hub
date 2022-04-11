const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('../db/middlewares/errorMiddlewares');

const corsOptions ={
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const PORT = 3001;

const users = require('../db/routes/users');
const videos = require('../db/routes/videos');
const tweets = require('../db/routes/tweets');
const trackedPlayers = require('../db/routes/trackedPlayers');
const redditPosts = require('../db/routes/redditPosts');

const app = express();

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
  extended: true
}));


// ROUTES

app.use('/videos', videos);

app.use('/tweets', tweets)

app.use('/redditPosts', redditPosts)

app.use('/users', users);

app.use('/trackedPlayers', trackedPlayers);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});