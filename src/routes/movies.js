const express = require('express');

const Joi = require('@hapi/joi');

const Movie = require('../models/movie');

const Director = require('../models/director');

const movieRouter = express.Router();

const validation = require('../utils/validation');

Movie.belongsTo(Director, {
  foreignKey: {
    name: 'director_id',
    allowNull: false,
  },
});

movieRouter.get('/', (req, res) => {
  Movie.findAll().then(result => res.send(result));
});

movieRouter.get('/:movieId', (req, res) => {
  const { error } = Joi.validate({ movieId: req.params.movieId }, validation.movieId);
  if (error === null) {
    Movie.findOne({ where: { rank: req.params.movieId } })
      .then((movie) => {
        if (movie === null) {
          res.status(400).send('No such movie exists with the given id');
        } else {
          res.send(movie);
        }
      })
      .catch(err => console.log(err));
  } else {
    res.send('Please provide the id as integer');
  }
});

movieRouter.post('/', (req, res) => {
  const { error } = Joi.validate(req.body, validation.schemaMovieAdd);
  if (error === null) {
    Director.findOne({ where: { id: req.body.director_id } })
      .then((result) => {
        if (result === null) {
          res.status(400).send('Movie can\'t be added because the director doesn\'t exist');
        } else {
          Movie.create(req.body)
            .then(addedEntry => res.send(addedEntry))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(400).send('There is something wrong with the provided detials');
  }
});

movieRouter.put('/:movieId', (req, res) => {
  const { error: movieIdError } = Joi.validate(req.params, validation.movieId);
  const { error: movieDetailsError } = Joi.validate(req.body, validation.schemaMovieUpdate);
  if (movieIdError === null && movieDetailsError === null) {
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
  } else {
    res.status(400).send('There is problem either with the id or the movie details');
  }
});

movieRouter.delete('/:movieId', (req, res) => {
  const { error } = Joi.validate(req.params, validation.movieId);
  if (error === null) {
    Movie.findOne({ where: { rank: req.params.movieId } })
      .then((movie) => {
        if (movie === null) {
          res.status(400).send('No such movie exists with this id');
        } else {
          movie.destroy()
            .then(result => res.send(result))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(400).send('Please provide the id as integer');
  }
});

module.exports = movieRouter;
