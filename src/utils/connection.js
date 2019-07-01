const Sequelize = require('sequelize');

const sequelize = new Sequelize('movies_db', 'root', 'hassan', {
  host: '172.17.0.2',
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
  // logging: false,
});

module.exports = sequelize;
