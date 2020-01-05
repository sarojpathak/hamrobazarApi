const express = require('express');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.post('/signup',(req,res,next)=>{
let password = req.body.password;
bcrypt.hash(password,10,function (err,hash) {
	if(err){
		let err = new Error('Could not hash!');
		err.status=500;
		return next(err);
	}
	User.create({
		fullName:req.body.fullName,
		email:req.body.email,
		password:req.body.password,
		phone:req.body.phone,
		mobilePhone:req.body.mobilePhone,
		street:req.body.street,
		area:req.body.area,
		city:req.body.city,
		newsletter:req.body.newsletter,
		hidePhone:req.body.hidePhone,
		agree:req.body.agree,
		image:req.body.image
	}).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
})
})


router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
        	console.log(user.email);
            if (user == null) {
                let err = new Error('Email Address not found!');
                err.status = 401;
                return next(err);
            } 
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                    	console.log(req.body.password);
              			console.log(user.password);
                        // if (!isMatch) {
                        //     let err = new Error('Password does not match!');
                        //     err.status = 401;
                        //     return next(err);
                        // }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})
router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ 
    	 _id: user._id,
    	fullName:req.body.fullName,
		email:req.body.email,
		password:req.body.password,
		pgone:req.body.phone,
		mobilePhone:req.body.mobilePhone,
		street:req.body.street,
		area:req.body.area,
		city:req.body.city,
		newsletter:req.body.newsletter,
		hidePhone:req.body.hidePhone,
		agree:req.body.agree,
		image:req.body.image
	});
});

router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({
             _id: user._id,
            fullName:req.body.fullName,
			email:req.body.email,
			password:req.body.password,
			pgone:req.body.phone,
			mobilePhone:req.body.mobilePhone,
			street:req.body.street,
			area:req.body.area,
			city:req.body.city,
			newsletter:req.body.newsletter,
			hidePhone:req.body.hidePhone,
			agree:req.body.agree,
			image:req.body.image
	});
        }).catch(next);
});

module.exports = router;