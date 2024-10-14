const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Prova = require('./models/prova');

mongoose.connect('mongodb://localhost:27017/provaDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas
const provaRoutes = require('./routes/prova');
app.use('/provas', provaRoutes);

// Página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Detalhes de cada prova
app.get('/provas/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const prova = await Prova.findById(id); // Usando Mongoose para buscar pelo ID
      if (!prova) {
        return res.status(404).send('Prova não encontrada');
      }
      res.render('detalhesProva', { prova });
    } catch (error) {
      res.status(500).send('Erro ao buscar a prova');
    }
  });
  

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
