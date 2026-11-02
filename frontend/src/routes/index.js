const express = require('express');

const homeController = require('../controllers/homeController');
const backendHealthController = require('../controllers/backendHealthController');

const router = express.Router();

router.get('/', homeController.renderHome);
router.get('/api/backend-health', backendHealthController.getBackendHealth);

module.exports = router;
