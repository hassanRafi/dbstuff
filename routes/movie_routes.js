const express = require('express');

const Joi = require('@hapi/joi');

const movies = require('../models/movies');

const movieRouter = express.Router();

const validation = require('../validation/validation');

movieRouter.get('/', (req, res) => {
  movies.getMovies().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

movieRouter.get('/:movieId', (req, res) => {
  movies.getMovieWithId(req.params.movieId).then((results) => {
    if (results.length === 0) {
      res.status(400).send('No such movie exists');
    } else {
      res.send(results);
    }
  })
    .catch(err => console.log(err));
});

movieRouter.post('/', (req, res) => {
  const { error: movieIdError } = Joi.validate(req.body, validation.movieId);
  const { error: movieDetailsError } = Joi.validate(req.body, validation.schemaMovieAdd);
  if (movieIdError === null && movieDetailsError === null) {
    movies.addMovie(req.body).then(results => res.send(results));
  } else {
    res.status(400).send('Please provide the correct keys and values');
  }
});

movieRouter.put('/:movieId', (req, res) => {
  const { error: movieIdError } = Joi.validate(req.params, validation.movieId);
  const { error: movieDetailsError } = Joi.validate(req.body, validation.schemaMovieUpdate);
  if (movieIdError === null && movieDetailsError === null) {
    movies.updateMovie(req.params.movieId, req.body).then(result => res.send(result));
  } else {
    res.status(400).send('Please provide the number as id');
  }
});

movieRouter.delete('/:movieId', (req, res) => {
  const { error: movieIdError } = Joi.validate(req.params, validation.movieId);
  if (movieIdError === null) {
    movies.deleteMovie(req.params.movieId).then(results => res.send(results));
  }
});

module.exports = movieRouter;
