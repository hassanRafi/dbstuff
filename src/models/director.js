const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');

class Director extends Sequelize.Model {}

Director.init({
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  director: {
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  modelName: 'director',
});

module.exports = Director;
