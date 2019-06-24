const express = require('express');

const api = require('./api');

const app = express();
const port = 3000;

app.get('/api/directors', (req, res) => {
  api.getDirectors().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

app.get('/api/movies', (req, res) => {
  api.getMovies().then((results) => {
    res.send(results);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
