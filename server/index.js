const express = require('express');
const cors = require('cors');
const axios = require('axios');

const corsOptions ={
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const PORT = 3001;

const app = express();

app.use(cors(corsOptions));

// app.get('/tweets', function(req, res) {
//   axios.get(`https://api.twitter.com/1.1/lists/statuses.json?list_id=1164892`)
//   .then(function (response) {
//     console.log(response);
//     res.send('hello')
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});