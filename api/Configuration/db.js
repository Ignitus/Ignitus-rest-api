const mongoose = require('mongoose');

module.exports = function connectDB() {
  return mongoose.connect(
    'mongodb://ignitus:ignitus001@ds046037.mlab.com:46037/ignitus',
  );
};
