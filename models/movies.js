const directors = require('./directors');

const dbDetails = require('../src/database');

const connection = dbDetails.connectToDatabase(dbDetails.userDetails);

function getMovies() {
  return new Promise((resolve, reject) => {
    connection.query('select * from movies', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function getMovieWithId(id) {
  return new Promise((resolve, reject) => {
    connection.query(`select * from movies where rank = ${id}`, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function addMovieHelper(movieInfo) {
  return new Promise((resolve, reject) => {
    directors.addDirector(movieInfo.directorName).then((res) => {
      connection.query(`select id from directors where director = '${res[0].director}'`, (err, results) => {
        if (err) reject(err);
        resolve(results[0].id);
      });
    });
  });
}

function checkIfMoveExists(title) {
  return new Promise((resolve, reject) => {
    connection.query(`select * from movies where title = '${title}'`, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}

function addMovie(movieInfo) {
  return new Promise((resolve, reject) => {
    addMovieHelper(movieInfo).then((directorId) => {
      const movie = Object.entries(movieInfo).reduce((acc, fields) => {
        if (fields[0] === 'directorName') {
          acc.director_id = directorId;
        } else {
          acc[fields[0]] = fields[1];
        }
        return acc;
      }, {});
      checkIfMoveExists(movie.title).then((results) => {
        if (results.length === 0) {
          connection.query('insert into movies set ?', movie, (error) => {
            if (error) reject(error);
            resolve(movie);
          });
        } else {
          resolve(movie);
        }
      });
    });
  });
}

function checkIfMoveExistsWithId(id) {
  return new Promise((resolve, reject) => {
    connection.query(`select * from movies where rank = ${id}`, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}

function updateMovie(id, movieDetails) {
  return new Promise((resolve, reject) => {
    checkIfMoveExistsWithId(id).then((movie) => {
      if (movie.length === 0) {
        resolve('No such movie exists');
      } else if (movieDetails.hasOwnProperty('directorName')) {
        directors.checkIfDirectorExitsWithName(movieDetails.directorName).then((res) => {
          const movieDetail = Object.entries(movieDetails).reduce((acc, cur) => {
            if (cur[0] === 'directorName') {
              acc.director_id = res;
            } else {
              acc[cur[0]] = cur[1];
            }
            return acc;
          }, {});
          if (movieDetail.director_id !== false) { // Means director_id will be id of some director
            connection.query(`update movies set ? where rank = ${id}`, movieDetail, (err) => {
              if (err) reject(err);
            });
            connection.query(`select * from movies where rank = ${id}`, (err, ress) => {
              if (err) reject(err);
              resolve(ress);
            });
          } else {
            directors.addDirector(movieDetails.directorName).then((result) => {
              movieDetail.director_id = result[0].id;
            })
              .then(() => {
                connection.query(`update movies set ? where rank = ${id}`, movieDetail, (err) => {
                  if (err) reject(err);
                });
              })
              .then(() => {
                connection.query(`select * from movies where rank = ${id}`, (err, ress) => {
                  if (err) reject(err);
                  resolve(ress);
                });
              })
              .catch(err => console.log(err));
          }
        });
      } else {
        connection.query(`update movies set ? where rank = ${id}`, movieDetails, (err) => {
          if (err) reject(err);
        });

        connection.query(`select * from movies where rank = ${id}`, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      }
    });
  });
}

function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    checkIfMoveExistsWithId(id).then((results) => {
      if (results.length === 0) {
        resolve('No such movie exists');
      } else {
        connection.query(`delete from movies where rank = ${id}`, (err, res) => {
          if (err) reject(err);
          if (res.affectedRows === 1) { // Means entry deleted
            resolve(results);
          }
        });
      }
    });
  });
}

module.exports = {
  getMovies,
  getMovieWithId,
  addMovie,
  updateMovie,
  deleteMovie,
};
