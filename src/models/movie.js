const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');

class Movies extends Sequelize.Model {}

Movies.init({
  // attributes
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  runtime: {
    type: Sequelize.INTEGER,
  },
  genre: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.DOUBLE,
  },
  metascore: {
    type: Sequelize.STRING,
  },
  votes: {
    type: Sequelize.INTEGER,
  },
  gross_earning_in_mil: {
    type: Sequelize.STRING,
  },
  actor: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
  },
}, {
  sequelize,
  modelName: 'movie',
});

module.exports = Movies;
