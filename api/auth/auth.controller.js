const jwt = require('jsonwebtoken');
const User = require('./../usuario/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const settings = require('../../config/settings');

async function findUserByEmail(email, isTest) {
  if (!email) {
    throw new Error('Email not found');
  }

  const filters = {
    deleted: false,
    email,
  };

  const user = await User
    .findOne(filters)
    .select('_id email password')
    .lean();

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

const generateUserToken = user => jwt.sign(
  user,
  settings.jwt
  // TODO: verificar si se requiere token con expiración
  // { expiresIn: 60 * settings.tokenExpirationMinutes },
);

module.exports.attempt = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error('Falta enviar usuario y/o password');
    }

    const user = await findUserByEmail(req.body.email);
    console.log('user found', user);

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      throw new Error('Password y usuario no coinciden');
    }
    console.log('password is valid');
    const leanUser = Object.assign({}, user, { name: undefined, password: undefined, lastName: undefined });
    const token = generateUserToken(leanUser);
    console.log('token generated', token);
    res.json({ user: Object.assign({}, user, { password: undefined }), token });
    console.log('res sent', res);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Password y usuario no coinciden' });
  }
};

module.exports.extendToken = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await findUserByEmail(email, req.query.test === 'true');
    if (user) {
      const token = generateUserToken(user);
      return res.json({ message: 'OK', token });
    }
    return res.status(500).json({ message: 'Invalid token' });
  } catch (err) {
    res.status(500).json({ message: 'Invalid token' });
  }
};
