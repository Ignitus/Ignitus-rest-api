'use strict';
const mongoose=require('mongoose');

const Internships = require('../models/internship').Internships

//adding a new intership
    exports.addInternship = function (req, res) {
        Internships.create(req.body, function (err) {
             if (err){
                res.sendStatus(400);
             } else{
                 res.sendStatus(201);
             }
        });
    }

//displaying all internships
    exports.viewAllInternships = function (req, res) {
        Internships.find({}, (err, docs) => {
              if (err) {
                res.sendStatus(404)
              }else{
                res.send(docs)
                
              }
        
        })

    }

//find internship by Id
    exports.viewInternshipByID = function (req, res){
        Internships.findById(req.params.id, (err, docs) => {
            if (err){ 
                res.sendStatus(400)
            }else{
                res.json(docs)
            }
        });
    }

//update an internship
    exports.updateInternship = function (req, res) {
        Internships.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, docs) => {
               if (err){
                res.sendStatus(400)
               }else{
                  res.sendStatus(200)
                 }
        })
    }

//delete an internship
     exports.deleteInternship = function(req, res) { 
        Internships.findByIdAndRemove(req.params.id, (err) => {
            if (err){
                res.sendStatus(400)
            }else{
                  res.sendStatus(200)
                 }
        }) 
    }

    
