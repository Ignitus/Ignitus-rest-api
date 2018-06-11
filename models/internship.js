const mongoose=require('mongoose');

const internshipSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    offeredBy:{type: String, required: true},
    documentsRequired:{
        resume: {type: Boolean},
        letterRecommendation: {type: Boolean},
        Sop: {type: Boolean}
    }
});

const internships = mongoose.model('internships', internshipSchema);

module.exports = {
    Internships: internships
};