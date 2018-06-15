'use strict';
const mongoose=require('mongoose');

const Internships = require('../models/internship').Internships

//adding a new intership
    exports.addInternship = function (req, res) {
        Internships.create(req.body, function (err) {
             if (err){
                console.log("could not add internship");  
                throw err;
             } else{
                 res.sendStatus(201);
             }
        });
    }

//displaying all internships
    exports.viewAllInternships = function (req, res) {
        Internships.find({}, function (err, docs) {
              if (err) {
                console.log("oops something went wrong...");  
                throw err;
              }else{
                  res.json(docs)
                }
        });
    }

//find internship by Id
    exports.viewInternshipByID = function (req, res){
        Internships.findById(req.params.id, function (err, docs) {
            if (err){ 
                console.log("cannot load the requested internship")
                throw err;
            }else{
                res.json(docs)
            }
        });
    }

//update an internship
    exports.updateInternship = function (req, res) {
        Internships.findByIdAndUpdate(req.params.id, req.body, {new:true}, function (err, docs) {
               if (err){
                  console.log("cannot update internship!"); 
                  throw err;
                }else{
                    res.json(docs);
                }
        })
    }

//delete an internship
     exports.deleteInternship = function(req, res) { 
        Internships.findByIdAndRemove(req.params.id, function(err) {
            if (err){
                console.log("could not delete!!!")
                throw err;
            }else{
               console.log(`internship id ${req.params.id} removed!`);
                  res.sendStatus(200);
            }
        });
    
}