const axios = require('axios');

const { backendUrl } = require('../config/environment');

async function getHealth() {
  return axios.get(`${backendUrl}/health`, {
    timeout: 5000,
  });
}

function getBackendUrl() {
  return backendUrl;
}

module.exports = {
  getHealth,
  getBackendUrl,
};
