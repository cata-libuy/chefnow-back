const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const settings = require('./../config/settings');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: settings.jwt,
  ignoreExpiration: false,
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new Strategy(opts, async (jwtPayload, done) => {
  done(null, jwtPayload);
}));

module.exports = passport;
