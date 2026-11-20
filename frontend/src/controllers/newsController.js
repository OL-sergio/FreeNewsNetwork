const newsService = require('../services/newsService');

async function getNewsByCategory(req, res) {
  try {
    const category = req.query.category || 'business';
    const allowedCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ status: 'error', message: 'Invalid news category' });
    }

    const news = await newsService.getNewsByCategory(category);
    return res.json(news);
  } catch (error) {
    const status = error.response?.status || error.status || 502;
    const message = error.response?.data?.message || error.message || 'Unable to load category news';

    console.error('Category NewsAPI request failed:', error.message);
    return res.status(status).json({ status: 'error', message });
  }
}

async function getTopHeadlines(req, res) {
  try {
    const news = await newsService.getTopHeadlines();
    res.json(news);
  } catch (error) {
    const status = error.response?.status || error.status || 502;
    const message = error.response?.data?.message || error.message || 'Unable to load news';

    console.error('NewsAPI request failed:', error.message);
    res.status(status).json({ status: 'error', message });
  }
}

async function getPopularNews(req, res) {
  try {
    const news = await newsService.getPopularNews();
    res.json(news);
  } catch (error) {
    const status = error.response?.status || error.status || 502;
    const message = error.response?.data?.message || error.message || 'Unable to load popular news';

    console.error('Popular NewsAPI request failed:', error.message);
    res.status(status).json({ status: 'error', message });
  }
}

module.exports = {
  getTopHeadlines,
  getPopularNews,
  getNewsByCategory,
};
