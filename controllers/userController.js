const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('330195A1IiHo5mXf85ff99560P1');

const {User} = require('../models/user');

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
                    name: req.body.name,
                    email: req.body.email,
                    password: password,
                    phone: req.body.phone,
                    user_type: req.body.user_type
                });
                user = await user.save()
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
        sendOtp.send(req.body.phone, "THAMBOLAM", async function(err, data) {
            if (err) {
                console.log(err)
                return res.status(400).send({
                    'response': {
                        'message': 'otp sending failed'
                    },
                });
            }
            res.status(200).send({
                'response': {
                    'message': 'otp send successfully',
                    'data': data
                },
            })
        })
    } catch (ex) {
        next(ex)
    }
}


const verifyOTP = async (req, res, next)=>{
    sendOtp.verify(req.body.phone, req.body.otp, async function (error, data) {
        if(data.type == 'success'){ 
          if(req.body.user_type == 'client'){
             var user = await User.findOne({phone:Number(req.body.phone)})
             if(user) {
                return res.status(user ? 200 : 401).send({
                    'response': {
                        'message': (user && user.user_type == 'client') ? 'phone verified sucessfully' :'phone verification failed',
                        'success':(user && user.user_type == 'client') ? true : false ,
                        'user':(user && user.user_type == 'client') ? user : null,
                        'user_type':(user && user.user_type == 'client') ? user.user_type : null,
                        'auth_type':'login',
                        "token":(user && user.user_type == 'client') ? jwt.sign({userId: user._id,role: user.user_type},"secret") :null
                        },
                    });
             }
             else {
                user = new User({
                    phone: Number(req.body.phone),
                    user_type: 'client'
                });
                await user.save();
                return res.status(200).send({
                    'response': {
                      'message': 'phone verified sucessfully',
                      'success':true,
                      'user':user,
                      'user_type':user.user_type,
                      'auth_type':'signup',
                      "token":jwt.sign({userId: user._id,role: user.user_type},"secret")
                    }
                  });
           
             }
        }
        else if(req.body.user_type == 'staff') {
            var user = await User.findOne({phone: Number(req.body.phone)})
            return res.status(user ? 200 : 401).send({
                'response': {
                    'message': (user && user.user_type != 'client') ? 'phone verified sucessfully' :'phone verification failed',
                    'success':(user && user.user_type != 'client') ? true : false ,
                    'user':(user && user.user_type != 'client') ? user : null,
                    'user_type':(user && user.user_type != 'client') ? user.user_type : null,
                    'auth_type':'login',
                    "token":(user && user.user_type != 'client') ? jwt.sign({userId: user._id,role: user.user_type},"secret") :null
                    },
                });
          }
          else{
            return res.status(400).send({
                'response': {
                  'message': "client type doesn't exist",
                  'success':false
                },
              });
          }
        }
        else if(data.type == 'error'){
          return res.status(400).send({
            'response': {
              'message': 'OTP verification failed',
              'success':false
            },
          });
        }
      });
}

module.exports = {
    userSignup,
    userLogin,
    deleteUser,
    sendOTP,
    verifyOTP
}