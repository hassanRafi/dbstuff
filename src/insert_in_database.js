const movies = require('../movies/movies.json');
const dbDetails = require('./database');

const connection = dbDetails.connectToDatabase(dbDetails.userDetails);
/*
* Data for movies and directors
*/
const directors = {};
let id = 1;
movies.forEach((entry) => {
  if (!directors.hasOwnProperty(entry.Director)) {
    directors[entry.Director] = id;
    id += 1;
  }
});

const directorData = Object.entries(directors).reduce((acc, entry) => {
  acc.push({
    director: entry[0],
    id: entry[1],
  });
  return acc;
}, []);


const moviesData = movies.map((entry) => {
  const newentry = {};
  Object.keys(entry).forEach((key) => {
    if (key === 'Director') {
      newentry.director_id = directors[entry[key]];
    } else {
      newentry[key] = entry[key];
    }
  });
  return newentry;
});

// -------------------------------------------------------------------

function createTable(tableNamesAndschemas) {
  return tableNamesAndschemas.map((entry) => {
    return new Promise((resolve, reject) => {
      connection.query(`create table ${entry.tableName} (${entry.schema})`, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  });
}

function removeTableIfExists(tableNamesAndschemas) {
  return tableNamesAndschemas.map((entry) => {
    return new Promise((resolve, reject) => {
      connection.query(`drop table if exists ${entry.tableName}`, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  });
}

function populateTable(tableName, data) {
  data.forEach((entry) => {
    connection.query(`insert into ${tableName} set ?`, entry, (error) => {
      if (error) {
        throw error;
      }
    });
  });
}

/* Need to reverse the array because we have to delete the movies table first, because
*  it has a foreign key that refrences director table
*/

function createTables(tableNamesAndschemas) {
  Promise.all(removeTableIfExists(tableNamesAndschemas.slice().reverse())).then(() => {
    Promise.all(createTable(tableNamesAndschemas)).then(() => {
      populateTable('directors', directorData);
      populateTable('movies', moviesData);
      connection.end();
    })
      .catch(err => console.log(err));
  })
    .catch(err => console.log(err));
}

const tableNamesAndSchemas = [
  {
    tableName: 'directors',
    schema: `director varchar(256) not null,
    id int primary key auto_increment`,
  },
  {
    tableName: 'movies',
    schema: `rank int primary key auto_increment,
    title varchar(500) not null,
    description varchar(500),
    runtime int,
    genre varchar(500),
    rating real,
    metascore varchar(500),
    votes int,
    gross_earning_in_mil varchar(500),
    director_id int not null,
    actor varchar(500),
    year int,
    foreign key (director_id) references directors(id) on delete cascade`,
  },
];

createTables(tableNamesAndSchemas);
