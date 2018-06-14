const mongoose=require('mongoose');

const studentProfileSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email: {type:String, required:true, unique:true,
        match:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/}
});

const studentProfile=mongoose.model('studentProfile',studentProfileSchema);

module.exports={
    studentProfile: studentProfile
}