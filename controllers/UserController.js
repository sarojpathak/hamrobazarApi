var bcrypt = require('bcrypt');
var users = require('../models/UserModel');


function validator(req,res,next) {
    console.log(req.body);
    if(req.body.username===''){
        res.json({status:404,message:'username is required'});
    } else if(req.body.password===''){
        res.json({status:404,message:'password is required'});
    }else{
        next();
    }

}

function getHash(req,res,next){
    var saltRound = 10;
    var myPlaintextPassword=req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRound, function(err, hash) {
        if(hash){
            req.hashKey = hash;
            next();
        }if(err){
            res.json({status:500,message:'couldnot found request'})
        }
    });
}

function checkIfUserExit(req,res,next){
    //check username exit or not
    users.findOne({
        where:{username:req.body.username}
    })
        .then(function(result){
            if(result===null){
                next()
            }else{
                console.log("User already exit");
                res.json({status:409,message:'User already exit'});
            }

        })
        .catch(function(err){
            console.log(err);
            res.json(err);
        })
}


function register(req,res,next){
    //insert to dattabase;
    users.create({
        username:req.body.username,
        password:req.hashKey
    })
        .then(function(result){
            console.log(result);
            res.json(result);
        })
        .catch(function(err){
            console.log(err);
            res.json(err);
        })
}

function deleteUser(req, res, next){

    if(req.params.id === null || req.params.id === undefined){
        res.status(404);
        res.json({status:404, message: "id not provide"})
    }
    // req.params.id
    users.destroy({
        where: {
            id:req.params.id
        }
    })
        .then(function(result){
            console.log(result)
            if(result === 0){
                res.status(500);
                res.json({status:500, message: "couldnot delete"})
            }else{
                res.status(200);
                res.json({status:200, message: "delete success"})
            }
        })
        .catch(function(err){
            console.log(err)
        })
}

function updateUser(req,res,next){
    if(req.params.id === null || req.params.id === undefined){
        res.status(404);
        res.json({status:404, message: "id not provide"})
    }
    // req.params.id
    users.update({ username: req.body.username }, {
        where: {
            id: req.params.id
        }
    })
        .then(function(result){
            console.log(result)
            if(result === 0){
                res.status(500);
                res.json({status:500, message: "couldnot update"})
            }else{
                res.status(200);
                res.json({status:200, message: "update success"})
            }
        })
        .catch(function(err){
            console.log(err)
        })
}

function listUser(req,res,next){
    users.findAll()
        .then(users => {
            console.log("All users:", JSON.stringify(users, null, 4));
        });
}





module.exports= {
    validator,getHash,register,checkIfUserExit,deleteUser,updateUser,listUser
}