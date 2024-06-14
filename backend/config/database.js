const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Cap.Edu', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a PostgreSQL');
  })
  .catch(err => {
    console.error('No se pudo conectar a PostgreSQL:', err);
  });

module.exports = sequelize;
