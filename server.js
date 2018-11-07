// Declare dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conectar a base de datos
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/chef-now';
mongoose.connect(mongoUri);
mongoose.connection.on('error', (error) => {
  console.log('Error conectandose a bbdd', error);
  process.exit(-1);
});

// wake up
app.get('/test', (req, res) => {

  res.send('Que tal!')

});

// Run server
// const { port } = settings;
const port = 3000;

app.listen(port, () => {
  console.log('app is running on port', port);
});

// Export server
module.exports = app;
