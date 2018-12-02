// Declare dependencies
const mongoose = require('mongoose');
const Receta = mongoose.model('Receta');
const fs = require('fs');

module.exports.create = async(req, res) => {
    const receta = new Receta(req.body);
    receta.save((error, response) => {
        if (error) {
            console.log(error);
            res.status(400).json({ message: 'Error al crear receta: ' + error.message });
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
module.exports.list = async(req, res) => {
    let busqueda = req.query.search ? req.query.search : '';


    Receta.find({
        $and: [
            { $or: [{ titulo: { $regex: `.*${busqueda}.*` } }, { cuerpo: { $regex: `.*${busqueda}.*` } }] },
            { deleted: false }
        ]
    }).then(
        (response) => res.send(response),
        (err) => res.status(400).send(err)

    );
};

/*  Method Remove
 *  URI: /receta/:id
 *  Method: DELETE
 */
module.exports.remove = (req, res) => {
    Receta.findOneAndUpdate({
            _id: req.params.id
        }, { deleted: true }, { new: true },
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
    Receta.findOneAndUpdate({
            _id: req.params.id,
            deleted: false
        },
        req.body, { new: true },
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
module.exports.view = async(req, res) => {
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

/*  Method Upload
 *  URI: /receta/imagen/:url
 *  Method: POST
 */
module.exports.upload = async(req, res) => {
    if (req.file) {
        res.json({ success: true, filename: req.file.filename });
    } else {
        res.status(400).send({ success: false });
    }
};

module.exports.viewImage = (req, res) => {
    let filename = req.params.filename;
    fs.readFile(`./uploads/${filename}`, function(err, content) {
        if (err) {
            res.status(400).json({ success: false, msg: `no se encuentra imagen ${filename}, ${err}` })
        } else {
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(content);
        }
    });
};