const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { users, findUserByEmail, findUserById, addUser } = require('../users');
const { v4: uuidv4 } = require('uuid');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = findUserById(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  let user = findUserByEmail(profile.emails[0].value);
  if (!user) {
    user = {
      id: uuidv4(),
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: 'google'
    };
    addUser(user);
  }
  return done(null, user);
}));
