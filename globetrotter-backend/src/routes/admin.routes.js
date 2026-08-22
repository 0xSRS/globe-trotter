const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth.middleware');
const requireAdmin = require('../middleware/admin.middleware');
const adminController = require('../controllers/admin.controller');

router.use(authenticateJWT, requireAdmin);

router.get('/stats', adminController.getStats);
router.get('/top-cities', adminController.getTopCities);
router.get('/top-activities', adminController.getTopActivities);
router.get('/users', adminController.getUsers);
router.put('/users/:id/status', adminController.updateUserStatus);

module.exports = router;