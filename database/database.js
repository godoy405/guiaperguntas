const Sequelize = require('sequelize');
// Criando uma conexão com o banco de dados
const connection = new Sequelize('guiaperguntas', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
