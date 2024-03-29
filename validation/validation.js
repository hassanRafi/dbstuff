const Joi = require('@hapi/joi');

const schemaDirectorAdd = Joi.object().keys({
  director: Joi.string().min(2).max(30).required(),
});

const schemaMovieAdd = Joi.object().keys({
  title: Joi.string().min(2).max(500).required(),
  description: Joi.string().min(2).max(500).required(),
  runtime: Joi.number().required(),
  genre: Joi.string().min(2).max(30).required(),
  rating: Joi.number().required(),
  metascore: Joi.number().required(),
  votes: Joi.number().required(),
  gross_earning_in_mil: Joi.number().required(),
  directorName: Joi.string().min(1).max(30).required(),
  actor: Joi.string().min(2).max(30).required(),
  year: Joi.number().required(),
});

const schemaMovieUpdate = Joi.object().keys({
  title: Joi.string().min(2).max(500),
  description: Joi.string().min(2).max(500),
  runtime: Joi.number(),
  genre: Joi.string().min(2).max(30),
  rating: Joi.number(),
  metascore: Joi.number(),
  votes: Joi.number(),
  gross_earning_in_mil: Joi.number(),
  directorName: Joi.string().min(1).max(30),
  actor: Joi.string().min(2).max(30),
  year: Joi.number(),
});

const movieId = Joi.object().keys({
  movieId: Joi.number().required(),
});

module.exports = {
  schemaDirectorAdd,
  schemaMovieAdd,
  movieId,
  schemaMovieUpdate,
};
