const tripModel = require('../models/trip.model');
const budgetModel = require('../models/budget.model');

async function verifyTripOwnership(tripId, userId) {
  const trip = await tripModel.findTripById(tripId, userId);
  if (!trip) {
    const err = new Error('Trip not found or access denied');
    err.statusCode = 404;
    throw err;
  }
  return trip;
}

async function getBudget(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);

    await verifyTripOwnership(tripId, req.user.id);

    const breakdown = await budgetModel.getBudgetBreakdown(tripId);

    return res.status(200).json(breakdown);
  } catch (err) {
    return next(err);
  }
}

async function upsertBudget(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const { category, amount } = req.body;

    await verifyTripOwnership(tripId, req.user.id);

    const result = await budgetModel.upsertBudgetEntry(tripId, category, amount);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getBudget,
  upsertBudget,
};