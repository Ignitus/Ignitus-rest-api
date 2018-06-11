'use strict';
const mongoose=require('mongoose');

const studentProfile=require('../models/student_profile').studentProfile;
const professorProfile=require('../models/professor_profile').professorProfile;

exports.viewProfile= function (req,res) {
    studentProfile.find({email:req.userData.email})
        .exec()
        .then(result =>{
            if(result.length>0){
            res.status(200).json({
                sucess:true,
                data:result
            });
            }
        })
        .catch(err=>{
            res.status(404).json({
                sucess:false,
                message: 'student profile not found'
            });
        });

};
