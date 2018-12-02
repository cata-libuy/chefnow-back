// Load controller
const controller = require('./receta.controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        let random = Math.random();
        cb(null, `${random}-${file.originalname}`)
    }
});

let upload = multer({
    storage: storage
});

// Export routes endpoint
module.exports = (app) => {
    app.get('/receta', controller.list);
    app.post('/receta', controller.create);
    app.delete('/receta/:id', controller.remove);
    app.get('/receta/:id', controller.view);
    app.put('/receta/:id', controller.update);
    app.post('/receta/imagen/', upload.single('imagen'), controller.upload);
    app.get('/receta/imagen/:filename', controller.viewImage);
};