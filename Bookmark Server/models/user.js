const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookmark',
  }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
