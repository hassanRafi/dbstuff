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

function getDirectorWithIds() {
  return join();
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

// Helper function to join the tables movies and directors
function join() {
  return new Promise((resolve, reject) => {
    connection.query('select * from movies inner join directors where movies.director = directors.director', (error, results) => {
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
  getDirectorWithIds,
};
