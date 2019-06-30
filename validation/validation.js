const Joi = require('@hapi/joi');

const schemaDirectorAdd = Joi.object().keys({
  director: Joi.string().min(2).max(30).required(),
});

const schemaMovieAdd = Joi.object().keys({
  title: Joi.string().min(2).max(500).required(),
  description: Joi.string().min(2).max(2000).required(),
  runtime: Joi.number().required(),
  genre: Joi.string().min(2).max(100).required(),
  rating: Joi.number().required(),
  metascore: Joi.number().required(),
  votes: Joi.number().required(),
  gross_earning_in_mil: Joi.number().required(),
  director_id: Joi.number().required(),
  actor: Joi.string().min(2).max(100).required(),
  year: Joi.number().required(),
});

const schemaMovieUpdate = Joi.object().keys({
  title: Joi.string().min(2).max(500),
  description: Joi.string().min(2).max(2000),
  runtime: Joi.number(),
  genre: Joi.string().min(2).max(100),
  rating: Joi.number(),
  metascore: Joi.number(),
  votes: Joi.number(),
  gross_earning_in_mil: Joi.number(),
  director_id: Joi.number(),
  actor: Joi.string().min(2).max(100),
  year: Joi.number(),
});

const movieId = Joi.object().keys({
  movieId: Joi.number().required(),
});

const directorId = Joi.object().keys({
  id: Joi.number().required(),
});

const directorName = Joi.object().keys({
  director: Joi.string().required(),
});

module.exports = {
  schemaDirectorAdd,
  schemaMovieAdd,
  movieId,
  schemaMovieUpdate,
  directorId,
  directorName,
};
