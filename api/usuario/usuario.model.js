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
  },
  password:{
    type: String,
    default: false
  }  
});

// Export model for endpoint
module.exports = mongoose.model('Usuario', UserSchema);
