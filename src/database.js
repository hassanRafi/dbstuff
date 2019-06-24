const mysql = require('mysql');

const userDetails = {
  host: '172.17.0.2',
  user: 'root',
  password: 'hassan',
  database: 'movies_db',
};

function connectToDatabase(userDetail) {
  return mysql.createConnection({
    host: userDetail.host,
    user: userDetail.user,
    password: userDetail.password,
    database: userDetail.database,
  });
}

module.exports = { userDetails, connectToDatabase };
