const mongoose = require('mongoose');

// const dev = require('./dev');

// mongoose.connect(dev.dbURI);

mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () => {
  console.log('connection estabilished');
});

exports.db = db;
