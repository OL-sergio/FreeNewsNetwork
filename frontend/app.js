const path = require('node:path');

const express = require('express');

const routes = require('./src/routes');
const backendService = require('./src/services/backendService');

const app = express();
const port = Number.parseInt(process.env.PORT || '3000', 10);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Frontend server listening at http://localhost:${port}`);
    console.log(`Backend connection target: ${backendService.getBackendUrl()}`);
  });
}

module.exports = app;