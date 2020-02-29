const mongoose = require('mongoose');

module.exports = function connectDB() {
  return mongoose.connect(
    process.env.DATABASE_URI,
  );
};
