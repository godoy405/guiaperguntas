const express = require('express');
const app = express();


// Estou dizendo para o Express usar o EJS como mecanismo de visualização
app.set('view engine', 'ejs');
app.use(express.static('public')); // Para servir arquivos estáticos da pasta 'public'


app.get('/', (req, res) => {
  // Vai renderizar a string 'Bem vindo ao meu site !' usando o EJS
  res.render('index');
});

app.get('/perguntar', (req, res) => {  
  res.render('perguntar');
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});