// Declare dependencies
const bodyParser = require('body-parser');
// const credentials = require('./config/credentials');
const express = require('express');
// const expressPrettify = require('express-prettify');
// const methodOverride = require('method-override');
const mongoose = require('mongoose');
const settings = require('./config/settings');
// const passport = require('passport');
// const compression = require('compression');
// mongoose.Promise = require('bluebird');

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  return compression.filter(req, res);
}

// Connect to database MongoDB
mongoose.connect(settings.mongo.uri);
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(-1);
});

// Config server Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
// app.use(expressPrettify({ query: 'pretty' }));
// app.use(compression({ filter: shouldCompress }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// app.use(passport.initialize());

// Setting routes and populate
require('./api/api')(app);

// Setting static pages
// app.use(express.static(`${__dirname}/public`));
// require('./public/index.routes').default(app);

// wake up
app.get('/test', (req, res) => {
  res.send('Bienvenido postulante!')
});

// Run server
const { port } = settings;

if (process.env.NODE_ENV === 'testing') {
  app.listen();
} else {
  app.listen(port, () => {
    console.log('app is running on port', port);
  });
}

// Export server
module.exports = app;
