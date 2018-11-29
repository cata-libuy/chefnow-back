const authController = require('./auth.controller');
const passport = require('./../../utils/passport');

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.post('/login', authController.attempt);
  app.get('/auth/extend', authenticate, authController.extendToken);
};
