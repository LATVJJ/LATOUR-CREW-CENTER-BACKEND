// backend/db/dbConfig.js
const knex = require('knex');
const knexfile = require('../knexfile'); // Importa a configuração do Knex

// Usa a configuração de 'development' do knexfile.js
const db = knex(knexfile.development);

module.exports = db; // Exporta a instância do Knex configurada