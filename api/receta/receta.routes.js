// Load controller
const controller = require('./receta.controller');


// Export routes endpoint

module.exports = (app) => {
 app.get('/receta', controller.list);
 app.post('/receta', controller.create);
  //app.delete('/burguer/:id', controller.remove);
  //app.get('/burguer/:id', controller.view);
  // app.put('/burguer/:id', controller.update);
};
