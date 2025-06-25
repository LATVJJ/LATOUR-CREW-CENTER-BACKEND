// backend/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pirepRoutes = require('./routes/pirepRoutes'); // NOVO: Importa as rotas de PIREPs

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rotas de autenticação (registro e login)
app.use('/api/auth', authRoutes);

// NOVO: Conecta as rotas de PIREPs. Todas as rotas em pirepRoutes.js terão o prefixo /api/pireps
// O middleware authenticateToken será aplicado a todas as rotas DENTRO de pirepRoutes.js,
// conforme configurado lá.
app.use('/api/pireps', pirepRoutes);


// Rota de teste simples: GET para a raiz '/'
app.get('/', (req, res) => {
    res.send('Servidor LATOUR Crew Center Online!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Pressione CTRL+C para parar o servidor');
});