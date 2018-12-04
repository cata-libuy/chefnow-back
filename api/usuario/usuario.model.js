// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
    },
  apellidoPaterno: {
    type: String
  },
  apellidoMaterno: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  imagenPerfil: {
    type: String,
    default: 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg'
  }
});

// Export model for endpoint
module.exports = mongoose.model('Usuario', UserSchema);
