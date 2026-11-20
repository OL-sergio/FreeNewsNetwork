const express = require('express');

const homeController = require('../controllers/homeController');
const backendHealthController = require('../controllers/backendHealthController');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.get('/', homeController.renderHome);
router.get('/api/backend-health', backendHealthController.getBackendHealth);
router.get('/api/news', newsController.getTopHeadlines);
router.get('/api/news/popular', newsController.getPopularNews);
router.get('/api/news/category', newsController.getNewsByCategory);

module.exports = router;
