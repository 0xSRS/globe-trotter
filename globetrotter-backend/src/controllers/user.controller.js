const userModel = require('../models/user.model');
const userSavedCityModel = require('../models/userSavedCity.model');
const prisma = require('../config/db');
const computeTripStatus = require('../utils/tripStatus.util');

async function getMe(req, res, next) {
  try {
    const user = await userModel.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found', statusCode: 404 });
    }

    const trips = await prisma.trip.findMany({
      where: { userId: req.user.id },
      orderBy: { startDate: 'asc' },
    });

    const preplannedTrips = [];
    const previousTrips = [];

    for (const trip of trips) {
      const status = computeTripStatus(trip);
      if (status === 'completed') {
        previousTrips.push(trip);
      } else {
        preplannedTrips.push(trip);
      }
    }

    return res.status(200).json({ ...user, preplannedTrips, previousTrips });
  } catch (err) {
    return next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    const { firstName, lastName, profilePhoto, email, languagePref } = req.body;

    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto;
    if (email !== undefined) updateData.email = email;
    if (languagePref !== undefined) updateData.languagePref = languagePref;

    if (email !== undefined) {
      const existing = await userModel.findUserByEmail(email);
      if (existing && existing.id !== req.user.id) {
        return res.status(409).json({ error: 'Email already registered', statusCode: 409 });
      }
    }

    const user = await userModel.updateUser(req.user.id, updateData);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

async function deleteMe(req, res, next) {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

async function getSavedDestinations(req, res, next) {
  try {
    const saved = await userSavedCityModel.listSavedCities(req.user.id);
    return res.status(200).json(saved);
  } catch (err) {
    return next(err);
  }
}

async function addSavedDestination(req, res, next) {
  try {
    const { cityId } = req.body;
    if (!cityId) {
      return res.status(400).json({ error: 'cityId is required', statusCode: 400 });
    }

    const existing = await userSavedCityModel.findSavedCity(req.user.id, Number(cityId));
    if (existing) {
      return res.status(200).json(existing);
    }

    const saved = await userSavedCityModel.saveCity(req.user.id, Number(cityId));
    return res.status(201).json(saved);
  } catch (err) {
    return next(err);
  }
}

async function removeSavedDestination(req, res, next) {
  try {
    const cityId = Number(req.params.cityId);
    await userSavedCityModel.removeSavedCity(req.user.id, cityId);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getMe,
  updateMe,
  deleteMe,
  getSavedDestinations,
  addSavedDestination,
  removeSavedDestination,
};