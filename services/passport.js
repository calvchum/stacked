const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');

const User = mongoose.model('users'); // defining User with one argument is getting access to the model

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    });
});

passport.use(
    new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id})
      .then(existingUser => {
        if(existingUser) {
          //do nothing
          console.log("*GOOGLE USER ALREADY EXISTS*");
          done(null, existingUser);
        } else {
          console.log("*NEW GOOGLE USER RECORD CREATED*")          
          new User({ 
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
            }).save().then( user => done(null, user));
        }
      })
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      proxy: true 
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.id)
      console.log(profile.displayName)
      User.findOne({facebookId: profile.id})
      .then(existingUser => {
          if(existingUser) {
            // do nothing
            console.log("**FACEBOOK USER ALREADY EXISTS**");
            done(null, existingUser);
          } else {
            console.log("**NEW FACEBOOK USER RECORD CREATED**")
            new User({
              facebookId: profile.id,
              name: profile.displayName
            }).save().then( user => done(null, user));
          }
        }
      )
    }
  ));

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: '/auth/github/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
        User.findOne({githubId: profile.id})
        .then(existingUser => {
            if(existingUser) {
              // do nothing
              console.log("**GITHUB USER ALREADY EXISTS**");
              done(null, existingUser);
            } else {
              console.log("**NEW GITHUB USER RECORD CREATED**")
              new User({
                githubId: profile.id,
              }).save().then( user => done(null, user));
            }
          })
      }
    )
)
