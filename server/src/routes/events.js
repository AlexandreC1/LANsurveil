const path = require('path');
const express = require('express');
const multer = require('multer');
const authDevice = require('../middleware/auth');
const eventController = require('../controllers/eventController');

const router = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, '../../temp'),
  limits: { fileSize: 1024 * 1024 * 300 }
});

router.post('/', authDevice, eventController.createEvent);
router.post('/:id/upload', authDevice, upload.single('video'), eventController.uploadEvent);
router.get('/', eventController.listEvents);

module.exports = router;
