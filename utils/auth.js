const jwt = require('jsonwebtoken');

/** Verifica si el usuario declarado en token corresponde al de params */
const isUserAuthorized = (req) => {
  const tokenId = req.get('Authorization') && req.get('Authorization').split(' ')[1]
    ? jwt.decode(req.get('Authorization').split(' ')[1])._id
    : null;
  return tokenId && tokenId === req.params.userId;
}

module.exports = {
  isUserAuthorized
}
