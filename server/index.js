const express = require('express');
const routes = require('./routes');

const app = express();

// Serve web page
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Handle API actions
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use((req, res) => {
  res.status(404).send('Oops, that page appears to be missing!');
});

module.exports = app;
