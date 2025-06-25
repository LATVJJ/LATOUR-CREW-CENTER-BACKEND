// backend/routes/pirepRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig'); // Sua instância do Knex configurada
const authenticateToken = require('../middleware/authMiddleware'); // O middleware de autenticação

// Rota para registrar um novo PIREP (requer autenticação)
router.post('/', authenticateToken, async (req, res) => {
    const { aircraft_registration, aircraft_type, flight_number, origin, destination, flight_time } = req.body;
    const user_id = req.user.userId; // Obtém o ID do usuário do token (anexado pelo middleware)

    // Validação básica dos campos
    if (!aircraft_registration || !aircraft_type || !flight_number || !origin || !destination || !flight_time) {
        return res.status(400).json({ message: 'All PIREP fields are required.' });
    }

    try {
        const [id] = await db('pireps').insert({
            user_id,
            aircraft_registration,
            aircraft_type,
            flight_number,
            origin,
            destination,
            flight_time
        });

        res.status(201).json({ message: 'PIREP registered successfully!', pirepId: id });
    } catch (error) {
        console.error('PIREP registration error:', error);
        res.status(500).json({ message: 'Server error during PIREP registration.' });
    }
});

// Rota para obter todos os PIREPs do usuário logado (requer autenticação)
router.get('/', authenticateToken, async (req, res) => {
    const user_id = req.user.userId; // Obtém o ID do usuário do token

    try {
        const pireps = await db('pireps').where({ user_id }).orderBy('date_filed', 'desc');
        res.json(pireps);
    } catch (error) {
        console.error('Fetch PIREPs error:', error);
        res.status(500).json({ message: 'Server error while fetching PIREPs.' });
    }
});

module.exports = router;