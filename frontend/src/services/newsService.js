const axios = require('axios');

const newsApiUrl = 'https://newsapi.org/v2/top-headlines';
const popularNewsApiUrl = 'https://newsapi.org/v2/everything';

function getApiKey() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    const error = new Error('NEWS_API_KEY is not configured');
    error.status = 503;
    throw error;
  }

  return apiKey;
}

async function getNewsByCategory(category = 'business') {
  const apiKey = getApiKey();

  const response = await axios.get(newsApiUrl, {
    params: {
      country: 'us',
      category,
      apiKey,
    },
    timeout: 10000,
  });

  return {
    ...response.data,
    articles: Array.isArray(response.data.articles) ? response.data.articles.slice(0, 8) : [],
  };
}

async function getTopHeadlines() {
  const apiKey = getApiKey();

  const response = await axios.get(newsApiUrl, {
    params: {
      country: 'us',
      apiKey,
    },
    timeout: 10000,
  });

  return {
    ...response.data,
    articles: Array.isArray(response.data.articles) ? response.data.articles.slice(0, 3) : [],
  };
}

async function getPopularNews() {
  const apiKey = getApiKey();

  const response = await axios.get(popularNewsApiUrl, {
    params: {
      q: 'us',
      from: '2026-11-18',
      to: '2026-11-18',
      apiKey,
    },
    timeout: 10000,
  });

  return {
    ...response.data,
    articles: Array.isArray(response.data.articles) ? response.data.articles.slice(0, 3) : [],
  };
}

module.exports = {
  getTopHeadlines,
  getPopularNews,
  getNewsByCategory,
};
