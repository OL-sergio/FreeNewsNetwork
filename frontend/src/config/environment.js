const isRender = process.env.RENDER === 'true' || Boolean(process.env.RENDER_SERVICE_ID);
const configuredBackendUrl = isRender
  ? process.env.RENDER_BACKEND_URL || process.env.BACKEND_URL
  : process.env.BACKEND_URL;
const backendUrl = (configuredBackendUrl || 'http://localhost:5000').replace(/\/+$/, '');

module.exports = {
  backendUrl,
  isRender,
};
