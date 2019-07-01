const express = require('express');

const Movie = require('../models/movie');

const Director = require('../models/director');

const movieRouter = express.Router();

const validation = require('../utils/validation');

movieRouter.get('/', (req, res) => {
  Movie.findAll().then(result => res.send(result)).catch(err => console.log(err));
});

movieRouter.get('/:movieId', (req, res) => {
  const error = validation.validateId(req.params.movieId);
  if (error) {
    res.send('Please provide the id as integer');
  } else {
    Movie.findOne({ where: { rank: req.params.movieId } })
      .then((movie) => {
        if (movie === null) {
          res.status(400).send('No such movie exists with the given id');
        } else {
          res.send(movie);
        }
      })
      .catch(err => console.log(err));
  }
});

movieRouter.post('/', (req, res) => {
  const error = validation.validateAddMovie(req.body);
  if (error) {
    res.status(400).send('There is something wrong with the provided details');
  } else {
    Director.findOne({ where: { id: req.body.director_id } })
      .then((result) => {
        if (result === null) {
          res.status(400).send('Movie can\'t be added because the director doesn\'t exist');
        } else {
          return Movie.create(req.body);
        }
      })
      .then(addedEntry => res.send(addedEntry))
      .catch(err => console.log(err));
  }
});

movieRouter.put('/:movieId', (req, res) => {
  const error = validation.validateUpdateMovie(req.params.movieId, req.body);
  if (error) {
    res.status(400).send('There is problem either with the id or the movie details');
  } else {
    Movie.findOne({ where: { rank: req.params.movieId } })
      .then((movie) => {
        if (movie === null) {
          res.status(400).send('No movie exists with the given id');
        } else {
          Director.findOne({ where: { id: req.body.director_id } })
            .then((director) => {
              if (director === null) {
                res.status(400).send('Movie can\'t be updated because no director exists with the given id');
              } else {
                movie.update(req.body).then(result => res.send(result)).catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
});

movieRouter.delete('/:movieId', (req, res) => {
  const error = validation.validateId(req.params.movieId);
  if (error) {
    res.status(400).send('Please provide the id as integer');
  } else {
    Movie.findOne({ where: { rank: req.params.movieId } })
      .then((movie) => {
        if (movie === null) {
          res.status(400).send('No such movie exists with this id');
        } else {
          return movie.destroy();
        }
      })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  }
});

module.exports = movieRouter;
