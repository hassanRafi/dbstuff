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

function addDirector(director) {
  return new Promise((resolve, reject) => {
    connection.query(`insert into directors (director) values ('${director}')`, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function updateDirector(newDirName, directorId) {
  return new Promise((resolve, reject) => {
    connection.query(`update directors set director = '${newDirName}' where id = ${directorId}`, (error, results) => {
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
  getDirectorWithIds,
  addDirector,
  updateDirector,
};
