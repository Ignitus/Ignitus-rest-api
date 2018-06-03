const mongoose=require('mongoose');

var user_roleSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,

});

var user_roles=mongoose.model('users',user_roleSchema);

module.exports={
    User_roles:user_roles
}