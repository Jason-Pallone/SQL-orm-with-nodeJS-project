'use strict';

const cors = require('cors');
const express = require('express');
const routes = require('./routes');

// Create the Express app.
const app = express();

// Enable All CORS Requests
app.use(cors());

// Setup request body JSON parsing.
app.use(express.json());

/* for heroku deployment */
app.use(express.static(path.join(__dirname, "client", "build")));

// Setup a friendly greeting for the root route.
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome, please create a movie instance!',
  });
});

// Add routes.
app.use('/movies', routes);

// Send 404 if no other route matched.
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Setup a global error handler.
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

/* for heroku deployment */
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set our port.
app.set('port', process.env.PORT || 5000);

// Start listening on our port.
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
