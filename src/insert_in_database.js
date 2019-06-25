const movies = require('../movies/movies.json');
const dbDetails = require('./database');

const connection = dbDetails.connectToDatabase(dbDetails.userDetails);

movies.forEach((movie) => {
  connection.query('insert into movies set ?', movie, (error) => {
    if (error) {
      throw error;
    }
  });
});

connection.query('create table directors(id int primary key auto_increment) select distinct director from movies', (error) => {
  if (error) {
    throw error;
  }
});

connection.end();
