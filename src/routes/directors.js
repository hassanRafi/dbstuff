const express = require('express');

const Joi = require('@hapi/joi');

const Director = require('../models/director');

const directorRouter = express.Router();

const validation = require('../utils/validation');

directorRouter.get('/', (req, res) => {
  Director.findAll().then(result => res.send(result)).catch(err => console.log(err));
});

directorRouter.get('/:id', (req, res) => {
  const { error } = Joi.validate({ id: req.params.id }, validation.directorId);
  if (error) {
    res.status(400).send('Please provide integer as director id');
  }
  Director.findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (result === null || error !== null) {
        res.status(400).send('No director exists with this id');
      } else {
        res.send(result);
      }
    })
    .catch(err => console.log(err));
});

directorRouter.post('/', (req, res) => {
  const { error } = Joi.validate(req.body, validation.schemaDirectorAdd);
  if (error !== null) {
    res.status(400).send('Please provide correct details');
  } else {
    Director.findOne({ where: { director: req.body.director } })
      .then((result) => {
        if (result === null) {
          Director.create({ director: req.body.director })
            .then(r => res.send(r))
            .catch(err => console.log(err));
        } else {
          res.status(400).send('The director with this name already exists');
        }
      })
      .catch(err => console.log(err));
  }
});

directorRouter.put('/:directorId', (req, res) => {
  const { error: idError } = Joi.validate({ id: req.params.directorId }, validation.directorId);
  const { error: nameError } = Joi.validate(req.body, validation.directorName);
  if (idError === null && nameError === null) {
    Director.findOne({ where: { id: req.params.directorId } })
      .then((dir) => {
        if (dir === null) {
          res.status(400).send('No director with the given id exists');
        }
        return dir.update({
          director: req.body.director,
        });
      })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  } else {
    res.status(400).send('There is a problem either with id or name of director');
  }
});

directorRouter.delete('/:directorId', (req, res) => {
  const { error } = Joi.validate({ id: req.params.directorId }, validation.directorId);
  if (error === null) {
    Director.findOne({ where: { id: req.params.directorId } })
      .then((dir) => {
        if (dir === null) {
          res.status(400).send('No director with the given id exists');
        } else {
          dir.destroy()
            .then(delDir => res.send(delDir))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(400).send('Please provide the director id as an integer');
  }
});

module.exports = directorRouter;
