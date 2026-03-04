const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
    titulo: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {
    console.log('Todos os modelos sincronizados');
}).catch(err => {
    console.error('Erro ao criar a tabela Pergunta:', err);
});

module.exports = Pergunta;