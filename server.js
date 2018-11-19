// Declare dependencies
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conectar a base de datos
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chef-now';
mongoose.connect(mongoUri);
mongoose.connection.on('error', (error) => {
  console.log('Error conectandose a bbdd', error);
  process.exit(-1);
});

// Config server Express
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


// wake up
app.get('/test', (req, res) => {

  res.send('Que tal!')

});

require('./api/api')(app);

// Run server
// const { port } = settings;
const port = 3000;

app.listen(port, () => {
  console.log('app is running on port', port);
});

// Export server
module.exports = app;
