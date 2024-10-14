const express = require('express');
const router = express.Router();
const Prova = require('../models/prova');

// Página para criar uma nova prova
router.get('/criar', (req, res) => {
    res.render('prova');
});

// Salvar prova no banco de dados
router.post('/salvar', async (req, res) => {
    const nomeProva = req.body.nome;
    const questoes = [];
  
    // Pega as alternativas selecionadas
    for (let i = 1; i <= 55; i++) {
      const alternativa = req.body[`questao${i}`];
      // Adiciona a alternativa ou "Não respondida" se não houver resposta
      questoes.push({ numero: i, alternativa: alternativa || "Não respondida" });
    }
  
    // Verifica se a prova já existe
    const provaExistente = await Prova.findOne({ nome: nomeProva });
    if (provaExistente) {
      return res.send('Prova já existe. Escolha outro nome.');
    }
  
    // Cria e salva a prova
    const novaProva = new Prova({ nome: nomeProva, questoes });
    await novaProva.save();
    res.redirect('/');
  });


// Rota para ver detalhes da prova
router.get('/provas/:id', async (req, res) => {
    try {
      console.log('ID da prova:', req.params.id); // Log do ID da prova
      const provaId = req.params.id;
      const prova = await Prova.findById(provaId);
  
      if (!prova) {
        console.log('Prova não encontrada'); // Log para prova não encontrada
        return res.status(404).send('Prova não encontrada.');
      }
  
      // Renderiza a página de detalhes com as informações da prova
      res.render('detalhes', { prova });
    } catch (error) {
      console.error('Erro ao buscar a prova:', error); // Log detalhado do erro
      res.status(500).send('Erro ao buscar a prova');
    }
  });
  

// Listar todas as provas
router.get('/listar', async (req, res) => {
    const provas = await Prova.find();
    res.render('listar', { provas });
});

module.exports = router;
