// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const RecetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    cuerpo: {
        type: String,
        required: true,
    },
    tiempoPreparacion: {
        type: Number,
        required: true,
    },
    porcion: {
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    imagenPrincipal: {
        type: String,
        default: 'https://chef-now-api.herokuapp.com/receta/imagen/default.jpeg'
    }
});

// Export model for endpoint
module.exports = mongoose.model('Receta', RecetaSchema);