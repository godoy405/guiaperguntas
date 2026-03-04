const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

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


app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {
      id: id
    }
  }).then(pergunta => {
    if(pergunta != undefined) {

       Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [['id', 'DESC']]
      }).then(respostas => {
        res.render('pergunta',{
        pergunta: pergunta,
        respostas: respostas
      });
    });
      
    }else{
      res.redirect('/');
    }  

  }); 
   
});

app.post('/responder', (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.perguntaId;
  Resposta.create({ 
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect('/pergunta/' + perguntaId);
  });
});


app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});