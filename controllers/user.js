'use strict';
const mongoose=require('mongoose');

const Users=require('../models/user').Users;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//register controller

exports.register= function (req,res) {
    Users.find({email: req.body.email})
        .exec()
        .then(data => {
            if (data.length >= 1) {
                return res.status(409).json({
                    success: false,
                    message: 'user already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: 'sorry! something happened, please try again'
                        });
                    } else {
                        const user = new Users({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash

                        });
                        user.save()
                            .then(result => {
                                res.status(200).json({
                                    success: true,
                                    message: 'sucessfully registered'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    success: false,
                                    message: 'sorry! something happened, please try again'
                                });
                            });
                    }
                });
            }
        });
};

//login controller

exports.login= function (req,res) {
    Users.find({email: req.body.email})
        .exec()
        .then(data => {
            if (data.length < 1) {
                return res.status(401).json({
                    success: false,
                    message: 'invalid user'
                });
            } else {
                bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            message: 'invalid user'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: data[0].email,
                                userId: data[0]._id
                            },
                            'secret',
                            {expiresIn: "1h"}
                        );
                        return res.status(200).json({
                            success: 'successfully logged in',
                            token: token
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'invalid user'
                        });
                    }
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: 'something happened! please try again'
            });
        });
};