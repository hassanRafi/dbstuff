const express = require('express');

const bodyParser = require('body-parser');

const morgan = require('morgan');


const directorRouter = require('./routes/directors');

const movieRouter = require('./routes/movies');

const app = express();

app.use(morgan('combined'));

app.use(bodyParser.json()); // body was undefined before using this

const port = 5000;

app.use('/api/directors', directorRouter);

app.use('/api/movies', movieRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
