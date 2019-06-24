const dbDetails = require('./database');

const connection = dbDetails.connectToDatabase(dbDetails.userDetails);

function getDirectors() {
  return new Promise((resolve, reject) => {
    connection.query('select director from movies', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function getMovies() {
  return new Promise((resolve, reject) => {
    connection.query('select title from movies', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {
  getDirectors,
  connection,
  getMovies,
};
