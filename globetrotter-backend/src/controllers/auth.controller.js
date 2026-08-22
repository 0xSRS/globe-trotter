const crypto = require('crypto');
const userModel = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash.util');
const { signToken } = require('../utils/jwt.util');

async function register(req, res, next) {
  try {
    const { firstName, lastName, email, phone, city, country, additionalInfo, password } = req.body;

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered', statusCode: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await userModel.createUser({ firstName, lastName, email, phone, city, country, additionalInfo, passwordHash });
    const token = signToken({ id: user.id, email: user.email });

    return res.status(201).json({ token, user });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password', statusCode: 401 });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password', statusCode: 401 });
    }
    if (!user.isActive) {
        return res.status(403).json({ error: 'This account has been deactivated', statusCode: 403 });
    }   

    const token = signToken({ id: user.id, email: user.email });
    const { passwordHash, ...userWithoutPassword } = user;

    return res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    return next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await userModel.findUserByEmail(email);

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      console.log('PASSWORD RESET TOKEN (stub):', resetToken);
    }

    return res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login, forgotPassword };