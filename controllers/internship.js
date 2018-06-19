'use strict';
const mongoose=require('mongoose');

const Internships = require('../models/internship').Internships

//adding a new intership
    exports.addInternship = function (req, res) {
        Internships.create(req.body, (err) => {
             if (err){
                res.status(404).send({message:"cannot create internship, please try again!", err:err});
             } else{
                 res.status(201).send("internship successfully added!");
             }
        });
    }

//displaying all internships
    exports.viewAllInternships = function (req, res) {
        Internships.find({}, (err, docs) => {
              if (err) {
                res.status(404).send({message:"could not load internships", err: err});
              }else{
                res.send(docs);
                }
        
        })

    }

//find internship by Id
    exports.viewInternshipByID = function (req, res){
        Internships.findById(req.params.id, (err, docs) => {
            if (err){ 
                res.status(404).send({message:"could not locate internship!", err: err});
            }else{
                res.send(docs);
            }
        });
    }

//update an internship
    exports.updateInternship = function (req, res) {
        Internships.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, docs) => {
               if (err){
                res.status(404).send({message:"cannot update internship, please try again!", err: err});
               }else{
                  res.send("successfully updated!");
                 }
        })
    }

//delete an internship
     exports.deleteInternship = function(req, res) { 
        Internships.findByIdAndRemove(req.params.id, (err) => {
            if (err){
                res.status(404).send({message:"cannot delete internship, please try again!", err: err});
            }else{
                  res.send("successfully deleted!");
                 }
        }) 
    }

    
