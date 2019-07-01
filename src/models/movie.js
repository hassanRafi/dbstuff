const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');
const Director = require('./director');

class Movie extends Sequelize.Model {}

Movie.init({
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

Movie.belongsTo(Director, {
  foreignKey: {
    name: 'director_id',
    allowNull: false,
  },
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

module.exports = Movie;
