const mongoose = require('mongoose');
const config = require('./config.js');

module.exports = function connectDB() {
  return mongoose.connect(
    config.mongoUrl,
  );
};
