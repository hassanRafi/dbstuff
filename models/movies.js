const dbDetails = require('../src/database');

const connection = dbDetails.connectToDatabase(dbDetails.userDetails);

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

function getMovieWithIds() {
  return join();
}

module.exports = {
  connection,
  getMovies,
  getMovieWithIds,
};
