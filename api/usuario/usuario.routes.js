// Load controller
const controller = require('./usuario.controller');

// Export routes endpoint
module.exports = (app) => {
 app.get('/usuario', controller.list);
 app.post('/usuario', controller.create);
 app.delete('/usuario/:id', controller.remove);
 app.get('/usuario/:id', controller.view);
 app.put('/usuario/:id', controller.update);
};
