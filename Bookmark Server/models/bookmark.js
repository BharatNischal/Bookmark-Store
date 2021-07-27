const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  selection: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('bookmark', bookmarkSchema);
