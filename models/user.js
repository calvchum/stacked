const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  githubId: String,
  name: String,
  email: String
});

mongoose.model('users', userSchema);