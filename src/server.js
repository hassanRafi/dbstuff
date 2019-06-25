const express = require('express');

const bodyParser = require('body-parser');

const directors = require('../models/directors');
const movies = require('../models/movies');

const app = express();
app.use(bodyParser.json()); // body was undefined before using this
const port = 3200;

app.get('/api/directors', (req, res) => {
  directors.getDirectors().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

app.get('/api/directors/:id', (req, res) => {
  directors.getDirectorWithIds().then(results => results.filter(entry => entry.id === parseInt(req.params.id, 10)))
    .then((movieDetails) => {
      if (movieDetails.length === 0) { // Means no director with given id exists
        res.status(400).send('Not Found');
      } else {
        res.send({ director: movieDetails[0].director });
      }
    })
    .catch(err => console.log(err));
});

app.post('/api/directors', (req, res) => {
  const { director } = req.body;
  directors.addDirector(director).then((results) => {
    if (results.affectedRows === 1) {
      res.send({ director });
    } else {
      res.send('Some error happened');
    }
  })
    .catch(err => console.log(err));
});

app.put('/api/directors/:directorId', (req, res) => {
  const { director: newDirName } = req.body;
  directors.updateDirector(newDirName, req.params.directorId).then((results) => {
    if (results.affectedRows === 1) {
      res.send({
        director: newDirName,
        id: req.params.directorId,
      });
    } else {
      res.send('Some error happened');
    }
  })
    .catch(err => console.log(err));
});

app.get('/api/movies', (req, res) => {
  movies.getMovies().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

app.get('/api/movies/:movieId', (req, res) => {
  movies.getMovieWithIds().then(results => results.filter(entry => entry.rank === parseInt(req.params.movieId, 10)))
    .then((movieDetails) => {
      if (movieDetails.length === 0) {
        res.status(400).send('Not Found');
      } else {
        res.send({ movie: movieDetails[0].title });
      }
    })
    .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
