// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// IMPORTANTE: Use a mesma chave secreta que você definiu em authRoutes.js!
const JWT_SECRET = process.env.JWT_SECRET || 'sua_super_secreta_chave_jwt_aqui';

function authenticateToken(req, res, next) {
    // Obter o token do cabeçalho 'Authorization'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'Authentication token required.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // Erro comum: Token expirado (TokenExpiredError) ou inválido (JsonWebTokenError)
            console.error('Token verification error:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        req.user = user; // Anexa as informações do usuário (userId, username) na requisição
        next(); // Prossegue para a próxima função (a rota propriamente dita)
    });
}

module.exports = authenticateToken;