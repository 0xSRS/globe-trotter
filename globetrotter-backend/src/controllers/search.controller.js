const cityModel = require('../models/city.model');
const activityModel = require('../models/activity.model');

async function searchCitiesHandler(req, res, next) {
  try {
    const { name, country, region } = req.query;

    const cities = await cityModel.searchCities({ name, country, region });

    return res.status(200).json(cities);
  } catch (err) {
    return next(err);
  }
}

async function searchActivitiesHandler(req, res, next) {
  try {
    const { cityId, category, minCost, maxCost, duration } = req.query;

    const params = { category, duration };

    if (cityId !== undefined) {
      params.cityId = parseInt(cityId, 10);
    }
    if (minCost !== undefined) {
      params.minCost = parseFloat(minCost);
    }
    if (maxCost !== undefined) {
      params.maxCost = parseFloat(maxCost);
    }

    const activities = await activityModel.searchActivities(params);

    return res.status(200).json(activities);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  searchCitiesHandler,
  searchActivitiesHandler,
};