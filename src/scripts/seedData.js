const sequelize = require('../utils/connection');
const Director = require('../models/director');
const Movie = require('../models/director');
const data = require('../utils/movies');

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
        Movie.create(movie);
      });
  });
}

Movie.belongsTo(Director, {
  foreignKey: {
    name: 'director_id',
    allowNull: false,
  },
});

connectToDb(sequelize)
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  })
  .then(() => sequelize.sync({ force: true }))
  .then(() => console.log('Tables created'))
  .then(() => Promise.all(insertIntoDirectors(data)))
  .then(() => console.log('Director Table Populated'))
  .then(() => Promise.all(insertIntoMovies(data)))
  .then(() => console.log('Movie Table Populated'))
  .catch(err => console.log(err));