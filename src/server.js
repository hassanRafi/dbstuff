const express = require('express');

const bodyParser = require('body-parser');

const directorRouter = require('../routes/director_routes');

const movieRouter = require('../routes/movie_routes');

const app = express();

app.use(bodyParser.json()); // body was undefined before using this

const port = 5000;

app.use('/api/directors', directorRouter);

app.use('/api/movies', movieRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
