const prisma = require('../config/db');

async function requireAdmin(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { isAdmin: true },
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required', statusCode: 403 });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = requireAdmin;