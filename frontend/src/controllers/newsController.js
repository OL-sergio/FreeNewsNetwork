const newsService = require('../services/newsService');

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
};
