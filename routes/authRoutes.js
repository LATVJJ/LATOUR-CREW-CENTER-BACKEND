// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Para criptografar senhas
const jwt = require('jsonwebtoken'); // Para criar tokens de autenticação
const db = require('../db/dbConfig'); // Sua instância do Knex configurada

// Sua chave secreta para JWT. MUDE ISSO EM PRODUÇÃO!
const JWT_SECRET = process.env.JWT_SECRET || 'sua_super_secreta_chave_jwt_aqui';

// Rota de Registro de Usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await db('users').where({ username }).first();
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        // Gera o hash da senha
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o custo do salt, um bom padrão

        // Insere o novo usuário no banco de dados
        const [id] = await db('users').insert({
            username,
            password_hash: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully!', userId: id });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Rota de Login de Usuário
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Busca o usuário no banco de dados
        const user = await db('users').where({ username }).first();
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compara a senha fornecida com o hash armazenado
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Gera um JWT
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful!', token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;