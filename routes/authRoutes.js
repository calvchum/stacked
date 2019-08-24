const passport = require('passport');

module.exports = app => {
	app.get(
	  '/',
	  (req, res) => {
	    res.send("Running application on port 5000");
	  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
    );

  app.get(
  '/auth/google/callback',
  passport.authenticate('google')
    );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook')
    );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook')
    );

  app.get(
    '/auth/github',
    passport.authenticate('github')
    );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github')
    );
}