// Declare dependencies
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const bcrypt = require('bcrypt-nodejs');


/*  Method crear
 *  URI: /usuario
 *  Method: POST
 */
module.exports.create = async (req, res) => {
  const user = new Usuario(req.body);
  
  if (!user.password) {
    throw new Error('Password requerida');
  }
  user.password = bcrypt.hashSync(user.password);

  user.save((error, response) => {
    if (error) {
      console.log('Error al crear usuario', error);
      res.status(400).json({ message: 'Error al crear usuario: ' +  error.message });
    } else if (!response) {
      console.log('Error desconocido al crear usuario');
      res.status(400).send({ message: 'Error desconocido al crear usuario' });
    } else {
      res.status(201).json(response);
    }
  });
};

/*  Method listar
 *  URI: /usuario
 *  Method: GET
 */
module.exports.list = async (req, res) => {
    Usuario.find({ deleted: false }).then(
    (response) => res.send(response),
    (err) => res.status(400).send(err)
  );
};

/*  Method Remove
 *  URI: /usuario/:id
 *  Method: DELETE
 */
module.exports.remove = (req, res) => {
  Usuario.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { deleted: true },
    { new: true },
    (error, response) => {
      if (error) {
        res.status(400).send(error);
      } else if (!response) {
        res.status(400).send(error);
      } else {
        res.json(response);
      }
    },
  );
};

/*  Method Update
 *  URI: /usuario/:id
 *  Method: PUT
*/
module.exports.update = (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password);
  }
  Usuario.findOneAndUpdate(
    {
      _id: req.params.id,
      deleted: false
    },
    req.body,
    { new: true },
    (error, response) => {
      if (error) {
        res.status(400).send(error);
      } else if (!response) {
        res.status(400).send(error);
      } else {
        res.json(response);
      }
    },
  );
};


/*  Method View
 *  URI: /usuario/:id
 *  Method: GET
 */
module.exports.view = async (req, res) => {
  try {
    const usuario = await Usuario
      .findOne({ _id: req.params.id, deleted: false })
      .lean();
    if (!usuario) {
      throw new Error();
    }
    res.json({ usuario });
  } catch (err) {
    errorTraceRaven(err);
    res.status(404).send(err);
  }
};
