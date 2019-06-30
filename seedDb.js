const sequelize = require('./src/database');
const Director = require('./models/directors');
const Movie = require('./models/movies');
const data = require('./movies/movies');

function getUniqueDirectors(data) {
  const uniqueDirectors = new Set();
  data.forEach((elem) => {
    uniqueDirectors.add(elem.Director);
  });
  return uniqueDirectors;
}

function connectToDb(sequelize) {
  return sequelize.authenticate();
}

function insertIntoDirectors(data) {
  return [...getUniqueDirectors(data)].map((director) => {
    return Director.create({
      director,
    });
  });
}

function insertIntoMovies(data) {
  return data.map((entry) => {
    return Director.findOne({ where: { director: entry.Director } })
      .then(res => res.dataValues.id)
      .then((directorId) => {
        const movie = Object.entries(entry).reduce((acc, item) => {
          if (item[0] === 'Director') {
            acc.director_id = directorId;
          } else {
            acc[item[0].toLowerCase()] = item[1];
          }
          return acc;
        }, {});
        return Movie.create(movie);
      });
  });
}

// Director.hasMany(Movie);

connectToDb(sequelize)
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  })
  .then(() => Director.sync({ force: true }))
  .then(() => console.log('Director table created'))
  .then(() => Promise.all(insertIntoDirectors(data)))
  .then(() => console.log('Director Table Populated'))
  .then(() => Movie.sync({ force: true }))
  .then(() => console.log('Movie table created'))
  .then(() => Promise.all(insertIntoMovies(data)))
  .then(() => console.log('Movie Table Populated'));
