const { verifyToken } = require('../utils/jwt.util');
const prisma = require('../config/db');

async function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided', statusCode: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { isActive: true },
    });

    if (!user || !user.isActive) {
      return res.status(403).json({ error: 'This account has been deactivated', statusCode: 403 });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token', statusCode: 401 });
  }
}

module.exports = authenticateJWT;