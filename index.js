const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/user.js'); // defines the model User with a schema
require('./services/passport');

mongoose.connect(keys.mongoURI); //connects mongoose to mongoDB (mLABs)
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(
  5000, 
  () => {console.log("Listening on port 5000...")}
);