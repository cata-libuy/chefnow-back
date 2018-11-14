// Load controller
const controller = require('./receta.controller');


// Export routes endpoint

module.exports = (app) => {
 app.get('/receta', controller.list);
 app.post('/receta', controller.create);
 app.delete('/receta/:id', controller.remove);
 app.get('/receta/:id', controller.view);
 app.put('/receta/:id', controller.update);
};
