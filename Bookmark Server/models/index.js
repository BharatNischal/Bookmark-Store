const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
console.log(process.env.DATABASEURL);
const databaseURL = process.env.DATABASEURL || 'mongodb+srv://bharat:PNbZRDcULvq1JKHT@cluster0-8clun.mongodb.net/test?retryWrites=true&w=majority';
console.log(databaseURL);
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Database connection error: ${err.message}`));

module.exports.Bookmark = require('./bookmark');
module.exports.User = require('./user');
