const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'connection error'));
/* eslint-disable no-console */
db.once('open', () => {
  console.log('connection estabilished');
});

exports.db = db;
