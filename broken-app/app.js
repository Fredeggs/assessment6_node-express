const express = require('express');
const ExpressError = require('./expressError')
let axios = require('axios');
var app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    axios.all(req.body.developers.map( d => axios.get(`https://api.github.com/users/${d}`)))
    .then((data) => {
      let users = data.map(u => ({name: u.data.name, bio: u.data.bio}))
      return res.send(JSON.stringify(users));
    });
  } catch(err) {
    next(err);
  }
});

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000);
