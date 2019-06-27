const express = require('express');

const Joi = require('@hapi/joi');

const directors = require('../models/directors');

const directorRouter = express.Router();

const validation = require('../validation/validation');

directorRouter.get('/', (req, res) => {
  directors.getDirectors().then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

directorRouter.get('/:id', (req, res) => {
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

directorRouter.post('/', (req, res) => {
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

directorRouter.put('/:directorId', (req, res) => {
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

directorRouter.delete('/:directorId', (req, res) => {
  directors.deleteDirector(req.params.directorId).then((results) => {
    res.send(results);
  })
    .catch(err => console.log(err));
});

module.exports = directorRouter;
