const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

router.use(authenticateJWT);

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.delete('/me', userController.deleteMe);

router.get('/me/saved-destinations', userController.getSavedDestinations);
router.post('/me/saved-destinations', userController.addSavedDestination);
router.delete('/me/saved-destinations/:cityId', userController.removeSavedDestination);

module.exports = router;