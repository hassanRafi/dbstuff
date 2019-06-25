const express = require('express');

const api = require('./api');

const app = express();
const port = 3100;

app.get('/api/directors', (req, res) => {
  api.getDirectors().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

app.get('/api/directors/:id', (req, res) => {
  api.getDirectorWithIds().then(results => results.filter(entry => entry.id === parseInt(req.params.id, 10)))
    .then((movieDetails) => {
      if (movieDetails.length === 0) { // Means no director with given id exists
        res.status(400).send('Not Found');
      } else {
        res.send({ director: movieDetails[0].director });
      }
    })
    .catch(err => console.log(err));
});

app.get('/api/movies', (req, res) => {
  api.getMovies().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
