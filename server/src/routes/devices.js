const express = require('express');
const authDevice = require('../middleware/auth');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

router.post('/register', deviceController.registerDevice);
router.post('/heartbeat', authDevice, deviceController.heartbeat);
router.get('/', deviceController.listDevices);

module.exports = router;
