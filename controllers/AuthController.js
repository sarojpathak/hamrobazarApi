//login form
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var users = require('../models/UserModel');

function validator(req, res, next){
    if(req.body.username === ""){
        res.json({status:404,message:'username is required'})
    }
    else if (req.body.password === ""){
        res.json({status:404, message:'Password is required'})
    }
    else{
        users.findOne({
            where: {
                username:req.body.username
            }
        })
            .then(function(result){
                if(result === null){
                    res.status(404)
                    res.json({status:404, message: "please resgister first not found"})
                }
                else{
                    req.passwordFromDB = result.dataValues.password
                    next();
                }
            })
        // next();
    }
}

//generation token - jwt bearer oauth
//this means if the login user has bearer then user can have access

function passwordChecker(req, res, next){
    console.log(req.body.password);
    console.log(req.body.username);
    //to retrive database password
    // users.user.findOne({
    // 	where: {
    // 		username:req.body.username
    // 	}
    // })
    // .then(function(result){
    // 	console.log(result)
    // 	console.log(result.dataValues.password);

    //to compare password
    bcrypt.compare(req.body.password, req.passwordFromDB)
        .then(function(result){
            console.log(result)

            if(result === true){
                next();
            }else {
                res.json({status:404, message:"errors"})
            }
        })
        .catch(function(err){
            console.log(err)
        })
    // })
    // // .catch(function(err){
    // // 	console.log(err)

    // // })
}

function jwtTokenGen(req, res,next){
    //token for each pers
    var myPayload = {
        username: req.body.username,
        userLevel: 'superadmin'
    }

    jwt.sign(myPayload, 'key',{expiresIn:"10h"}, function(err,resultToken){
        console.log(err);
        console.log(resultToken);
        res.json({"userToken": resultToken})
    })

}

function verifyToken(req,res,next){
// URL/URI
// header: authorization:bearer

    console.log(req.headers.authorization)
    var token = req.headers.authorization.slice(7,req.headers.authorization.length);

    jwt.verify(token,'key',function(err, result){
        console.log(result);
        if(result){
            next()
        }else{
            console.log(err);
            res.json(err);
        }
    })

}


module.exports = {
    passwordChecker,
    validator,
    jwtTokenGen,
    verifyToken
}