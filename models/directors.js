const dbDetails = require('../src/database');

const connection = dbDetails.connectToDatabase(dbDetails.userDetails);

function getDirectors() {
  return new Promise((resolve, reject) => {
    connection.query('select * from directors', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function getDirectorWithIds(id) {
  return new Promise((resolve, reject) => {
    connection.query(`select director from directors where id = ${id}`, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function addDirectorHelper(director) {
  return new Promise((resolve, reject) => {
    connection.query(`select * from directors where director = '${director}'`, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function addDirector(director) {
  return new Promise((resolve, reject) => {
    addDirectorHelper(director).then((results) => {
      if (results.length === 0) { // Means the director doesn't exist
        connection.query(`insert into directors (director) values ('${director}')`, (error) => {
          if (error) {
            reject(error);
          }
          connection.query(`select * from directors where director = '${director}'`, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
      } else {
        resolve(results);
      }
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

function deleteHelper(directorId) {
  return new Promise((resolve, reject) => {
    connection.query(`select * from directors where id = ${directorId}`, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function deleteDirector(directorId) {
  return new Promise((resolve, reject) => {
    deleteHelper(directorId).then((results) => {
      if (results.length === 0) {
        resolve('No such director exists');
      } else {
        connection.query(`delete from directors where id = ${directorId}`, (error) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      }
    });
  });
}

function checkIfDirectorExitsWithName(directorName) {
  return new Promise((resolve, reject) => {
    connection.query(`select id from directors where director = '${directorName}'`, (error, results) => {
      if (error) reject(error);
      if (results.length === 0) {
        resolve(false);
      } else {
        resolve(results[0].id);
      }
    });
  });
}

module.exports = {
  getDirectors,
  getDirectorWithIds,
  addDirector,
  updateDirector,
  deleteDirector,
  checkIfDirectorExitsWithName,
};
