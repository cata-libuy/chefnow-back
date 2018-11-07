// Declare dependencies
const express = require('express');
const app = express();
// app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
// app.use(bodyParser.json({ limit: '5mb' }));
// // app.use(expressPrettify({ query: 'pretty' }));
// // app.use(compression({ filter: shouldCompress }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

// app.use(passport.initialize());

// Setting routes and populate
// require('./api/api')(app);

// Setting static pages
// app.use(express.static(`${__dirname}/public`));
// require('./public/index.routes').default(app);

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
