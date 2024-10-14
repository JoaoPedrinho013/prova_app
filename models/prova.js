const mongoose = require('mongoose');

const provaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  questoes: [
    {
      numero: Number,
      alternativa: { 
        type: String, 
        enum: ['A', 'B', 'C', 'D', 'E', 'Não respondida'], // Adicionado 'Não respondida'
        required: false 
      }
    }
  ]
});

const Prova = mongoose.model('Prova', provaSchema);
module.exports = Prova;
