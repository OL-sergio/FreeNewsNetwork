const BackendHealth = require('../models/backendHealth');
const backendService = require('../services/backendService');

async function getBackendHealth(req, res) {
  try {
    const response = await backendService.getHealth();
    const health = new BackendHealth('available', undefined, response.data);

    return res.status(response.status).json(health.toResponse());
  } catch (error) {
    const status = error.response?.status || 503;
    const health = new BackendHealth(
      'unavailable',
      `Unable to connect to the backend at ${backendService.getBackendUrl()}.`,
    );

    return res.status(status).json(health.toResponse());
  }
}

module.exports = {
  getBackendHealth,
};
