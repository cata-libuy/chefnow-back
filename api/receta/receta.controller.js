// Declare dependencies
const mongoose = require('mongoose');
const Receta = mongoose.model('Receta');

module.exports.create = async (req, res) => {
  console.log('---------------------->',req.body);
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

module.exports.list = async (req, res) => {
  let recetas = ["receta1","receta2","receta3"]
  res.json(recetas);
};

/*  Method Remove
 *  URI: /board/:id
 *  Method: DELETE
 */
module.exports.remove = (req, res) => {
  Burguer.findOneAndUpdate(
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
 *  URI: /burguer/:id
 *  Method: PUT
*/
module.exports.update = (req, res) => {
  Burguer.findOneAndUpdate(
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
 *  URI: /burguer/:id
 *  Method: GET
 */
module.exports.view = async (req, res) => {
  try {
    const burguer = await Burguer
      .findOne({ _id: req.params.id, deleted: false })
      .lean();
    if (!burguer) {
      throw new Error();
    }
    res.json({ hamburguesa: burguer });
  } catch (err) {
    errorTraceRaven(err);
    res.status(404).send(err);
  }
};
