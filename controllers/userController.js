const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('330195A1IiHo5mXf85ff99560P1');

const User = require('../models/userModel');


const userSignup = async (req, res, next) => {
    try {
        let users = await User.find({ email: req.body.email })
        if (users.length >= 1) {
            console.log("email");
            return res.status(409).send({
                'response': {
                    'message': 'Email already exists'
                }
            })
        }
        else {
            let password = await bcrypt.hash(req.body.password, 10)
            let user;
            if (password) {
                user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: password,
                    phone: req.body.phone,
                    user_type: req.body.user_type
                });
                user = await user.save();
            }
            return res.status(201).send({
                'response': {
                    'message': "User created",
                    'result': user
                }
            })
        }
    } catch (ex) {
        next(ex);
    }
}

const userLogin = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({
                'response': {
                    'message': 'Auth failed'
                }
            })
        }

        let check = await bcrypt.compare(req.body.password, user.password);
        if (check) {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                    role: user.user_type
                },
                "secret",
                {
                    expiresIn: "1h"
                }
            );
            return res.status(200).send({
                'response': {
                    'message': "Auth successful",
                    'user': user,
                    'token': token
                }

            });
        } else {
            return res.status.send({
                'response': {
                    'message': 'Auth failed'
                }
            })
        }
    } catch (ex) {
        next(ex);
    }
}


const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        return res.status(200).send({
            'response': {
                'message': 'User deleted'
            }
        })
    } catch (ex) {
        next(ex);
    }
}


const sendOTP = async (req, res, next) => {
    try {
        let user = await User.findOne({ phone: req.body.phone });

        if (!user) {
            return res.status(401).send({
                'response': {
                    'message': 'no user registered with this phone number',
                    'success': false
                }
            });
        }
        else if (user) {
            sendOtp.send(req.body.phone, "SPONTOM", async(err, data)=>{
                if(err){
                    return res.status(401).send({
                        'respponse': {
                            'message': "otp sending failed"
                        }
                    });
                }
                return res.status(200).send({
                    'response': {
                        'message': 'successfull',
                        'data': data
                    }
                })
            })
        }
    } catch (ex) {
        next(ex);
    }
}


const verifyOTP = async (req, res, next)=>{
    try{
        sendOtp.verify(req.body.phone, req.body.otp, async (err, data)=>{
            console.log(data);
            if(data.type == 'success'){
                if(req.body.user_type){
                    let user = await User.findOne({phone: req.body.phone});
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id,
                            role: user.user_type
                        },
                        "secret",
                        {
                            expiresIn: "1h"
                        }
                    );
                    if(user){
                        return res.status(200).send({
                            'response': {
                                'message': data.message,
                                'success': true,
                                'user': user,
                                'token': token
                            }
                        })        
                    }
                }
                
            }
            else if(data.type == "error"){
                return res.status(401).send({
                    'response': {
                        'message': data
                    }
                })
            }
        })
    } catch(ex){
        next(ex);
    }
}

module.exports = {
    userSignup,
    userLogin,
    deleteUser,
    sendOTP,
    verifyOTP
}