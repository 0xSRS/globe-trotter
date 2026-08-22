const adminModel = require('../models/admin.model');
const parsePaginationParams = require('../utils/pagination.util');

async function getStats(req, res, next) {
  try {
    const stats = await adminModel.getStats();
    return res.status(200).json(stats);
  } catch (err) {
    return next(err);
  }
}

async function getTopCities(req, res, next) {
  try {
    const topCities = await adminModel.getTopCities(10);
    return res.status(200).json(topCities);
  } catch (err) {
    return next(err);
  }
}

async function getTopActivities(req, res, next) {
  try {
    const topActivities = await adminModel.getTopActivities(10);
    return res.status(200).json(topActivities);
  } catch (err) {
    return next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const { page, limit, skip, take } = parsePaginationParams(req.query);
    const search = req.query.search || undefined;

    const { users, total } = await adminModel.listUsers({ skip, take, search });

    return res.status(200).json({ page, limit, total, data: users });
  } catch (err) {
    return next(err);
  }
}

async function updateUserStatus(req, res, next) {
  try {
    const userId = Number(req.params.id);
    const current = await adminModel.getUserAdminFlag(userId);

    if (!current) {
      return res.status(404).json({ error: 'User not found', statusCode: 404 });
    }

    const updated = await adminModel.setUserActiveStatus(userId, !current.isActive);
    return res.status(200).json({ id: updated.id, isActive: updated.isActive });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getStats, getTopCities, getTopActivities, getUsers, updateUserStatus };