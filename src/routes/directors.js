const express = require('express');

const Director = require('../models/director');

const directorRouter = express.Router();

const validation = require('../utils/validation');

directorRouter.get('/', (req, res) => {
  Director.findAll().then(result => res.send(result)).catch(err => console.log(err));
});

directorRouter.get('/:id', (req, res) => {
  const error = validation.validateId(req.params.id);
  if (error) {
    res.status(400).send('Please provide integer as director id');
  } else {
    Director.findOne({ where: { id: req.params.id } })
      .then((result) => {
        if (result === null) {
          res.status(400).send('No director exists with this id');
        } else {
          // console.log(result.toJSON());
          // console.log(JSON.stringify(result));
          res.send(result);
        }
      })
      .catch(err => console.log(err));
  }
});

directorRouter.post('/', (req, res) => {
  const error = validation.validateAddDirector(req.body);
  if (error) {
    res.status(400).send('Please provide correct details');
  } else {
    Director.findOne({ where: { director: req.body.director } })
      .then((result) => {
        if (result === null) {
          return Director.create({ director: req.body.director });
        }
        res.status(400).send('The director with this name already exists');
      })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  }
});

directorRouter.put('/:directorId', (req, res) => {
  const error = validation.validateUpdateDirector(req.params.directorId, req.body);

  if (error) {
    res.status(400).send('There is a problem either with id or name of director');
  } else {
    Director.findOne({ where: { id: req.params.directorId } })
      .then((dir) => {
        if (dir === null) {
          res.status(400).send('No director with the given id exists');
        } else {
          return dir.update({
            director: req.body.director,
          });
        }
      })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  }
});

directorRouter.delete('/:directorId', (req, res) => {
  const error = validation.validateId(req.params.directorId);
  if (error) {
    res.status(400).send('Please provide the director id as an integer');
  } else {
    Director.findOne({ where: { id: req.params.directorId } })
      .then((dir) => {
        if (dir === null) {
          res.status(400).send('No director with the given id exists');
        } else {
          return dir.destroy();
        }
      })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  }
});

module.exports = directorRouter;
