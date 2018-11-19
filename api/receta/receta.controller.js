// Declare dependencies
const mongoose = require('mongoose');
const Receta = mongoose.model('Receta');

module.exports.create = async (req, res) => {
  const receta = new Receta(req.body);
  receta.save((error, response) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: 'Error al crear receta: ' +  error.message });
    } else if (!response) {
      res.status(400).send({ message: 'Error al crear receta' });
    } else {
      res.status(201).json(response);
    }
  });
};
/*  Method listar
 *  URI: /receta
 *  Method: get
 */
module.exports.list = async (req, res) => {
    Receta.find({ deleted: false }).then(
    (response) => res.send(response),
    (err) => res.status(400).send(err)
  );
};

/*  Method Remove
 *  URI: /receta/:id
 *  Method: DELETE
 */
module.exports.remove = (req, res) => {
  Receta.findOneAndUpdate(
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
 *  URI: /receta/:id
 *  Method: PUT
*/
module.exports.update = (req, res) => {
  Receta.findOneAndUpdate(
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
 *  URI: /receta/:id
 *  Method: GET
 */
module.exports.view = async (req, res) => {
  try {
    const receta = await Receta
      .findOne({ _id: req.params.id, deleted: false })
      .lean();
    if (!receta) {
      throw new Error();
    }
    res.json({ receta });
  } catch (err) {
    errorTraceRaven(err);
    res.status(404).send(err);
  }
};
