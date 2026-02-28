const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

// Testando a conexão com o banco de dados
connection.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

// Estou dizendo para o Express usar o EJS como mecanismo de visualização
app.set('view engine', 'ejs');
app.use(express.static('public')); // Para servir arquivos estáticos da pasta 'public'


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get('/', (req, res) => {
  Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(perguntas => {
    res.render('index', {
      perguntas: perguntas
    });
  });  
});

app.get('/perguntar', (req, res) => {  
  res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao 
  }).then(() => {
    res.redirect('/');
  });
});


app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});