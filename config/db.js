const mongoose= require('mongoose');

mongoose.connect(process.env.DATABASE_URI);

var db= mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));

db.once('open',function callback() {
    console.log('connection estabilished');
});

exports.db=db;


