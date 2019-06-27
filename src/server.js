const express = require('express');

const bodyParser = require('body-parser');

const Joi = require('@hapi/joi');

const validation = require('../validation/validation');

const directors = require('../models/directors');

const movies = require('../models/movies');

const app = express();
app.use(bodyParser.json()); // body was undefined before using this
const port = 2000;

app.get('/api/directors', (req, res) => {
  directors.getDirectors().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

app.get('/api/directors/:id', (req, res) => {
  directors.getDirectorWithIds(req.params.id)
    .then((results) => {
      if (results.length === 0) {
        res.status(400).send('No director with give id');
      } else {
        res.send(results);
      }
    })
    .catch(err => console.log(err));
});

app.post('/api/directors', (req, res) => {
  const { error: err } = Joi.validate(req.body, validation.schemaDirectorAdd);
  if (err) {
    res.status(400).send('Please provide the \'director\' as key');
  } else {
    directors.addDirector(req.body.director).then((results) => {
      res.send(results);
    })
      .catch(error => console.log(error));
  }
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
      res.status(400).send('No such director exists');
    }
  })
    .catch(err => console.log(err));
});

app.delete('/api/directors/:directorId', (req, res) => {
  directors.deleteDirector(req.params.directorId).then((results) => {
    res.send(results);
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
  movies.getMovieWithId(req.params.movieId).then((results) => {
    if (results.length === 0) {
      res.status(400).send('No such movie exists');
    } else {
      res.send(results);
    }
  })
    .catch(err => console.log(err));
});

app.post('/api/movies', (req, res) => {
  const { error: movieIdError } = Joi.validate(req.body, validation.movieId);
  const { error: movieDetailsError } = Joi.validate(req.body, validation.schemaMovieAdd);
  if (movieIdError === null && movieDetailsError === null) {
    movies.addMovie(req.body).then(results => res.send(results));
  } else {
    res.status(400).send('Please provide the correct keys and values');
  }
});

app.put('/api/movies/:movieId', (req, res) => {
  const { error: movieIdError } = Joi.validate(req.params, validation.movieId);
  const { error: movieDetailsError } = Joi.validate(req.body, validation.schemaMovieUpdate);
  if (movieIdError === null && movieDetailsError === null) {
    movies.updateMovie(req.params.movieId, req.body).then(result => res.send(result));
  } else {
    res.status(400).send('Please provide the number as id');
  }
});

app.delete('/api/movies/:movieId', (req, res) => {
  const { error: movieIdError } = Joi.validate(req.params, validation.movieId);
  if (movieIdError === null) {
    movies.deleteMovie(req.params.movieId).then(results => res.send(results));
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
