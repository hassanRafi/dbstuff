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
  director_id: Joi.number().required(),
  actor: Joi.string().min(2).max(100),
  year: Joi.number(),
});

const schemaId = Joi.object().keys({
  id: Joi.number(),
});

const schemaDirectorName = Joi.object().keys({
  director: Joi.string().required(),
});

/*
 * Validate function return true when there is error
 *
 */
function validateId(id) {
  const { error } = Joi.validate({ id }, schemaId);
  if (error === null) {
    return false;
  }
  return true;
}

function validateAddDirector(details) {
  const { error } = Joi.validate(details, schemaDirectorAdd);
  if (error === null) {
    return false;
  }
  return true;
}

function validateUpdateDirector(id, details) {
  const idError = validateId(id); // Result will be true or false
  const { error: nameError } = Joi.validate(details, schemaDirectorName);

  if (idError === false && nameError === null) {
    return false;
  }
  return true;
}

function validateAddMovie(details) {
  const { error } = Joi.validate(details, schemaMovieAdd);
  if (error === null) {
    return false;
  }
  return true;
}

function validateUpdateMovie(id, details) {
  const idError = validateId(id);
  const { error } = Joi.validate(details, schemaMovieUpdate);

  if (idError === false && error === null) {
    return false;
  }
  return true;
}
module.exports = {
  validateId,
  validateAddDirector,
  validateUpdateDirector,
  validateAddMovie,
  validateUpdateMovie,
};
