const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () => {
  console.log('connection estabilished');
});

exports.db = db;
