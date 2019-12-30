
var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var swaggerJSDOC= require('swagger-jsdoc');
var swaggerUI=require('swagger-ui-express');
var bodyParser = require('body-parser');
var app = express();

var dbConfig = require('./config/databaseConfig');
var userModel = require('./models/UserModel');

var UserController = require('./controllers/UserController');
var AuthController = require('./controllers/AuthController');

var swaggerDefinition = {
    info:{
        title:'My Application',
        description:'This is my app swagger application',
        version:'1.0.0'
    },
    host:'localhost:6000',
    basePath:'/'
}
var swaggerOptions={
    swaggerDefinition,
    apis:['./index.js']
}
var swaggerSpecs = swaggerJSDOC(swaggerOptions);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpecs));
app.use(bodyParser.urlencoded({extended:true}))
/**
 * @swagger
 * /registration:
 *  post:
 *   tags:
 *    - Users
 *   description: Users registration testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique username
 *    - name: password
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique password
 *    - name: address
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique address
 *   responses:
 *    201:
 *     description: registered successfully
 *    409:
 *     description: user already exists
 *    500:
 *     description: internal server error
 */


app.post('/registration',UserController.validator,UserController.checkIfUserExit,UserController.getHash,UserController.register)

app.post('/users', upload.single('image'), function (req, res, next) {
    console.log(req.file);
    console.log(req.body);
})

app.post('/login',AuthController.validator,AuthController.passwordChecker,AuthController.jwtTokenGen);

app.delete('/users/:id',AuthController.verifyToken,UserController.deleteUser)

app.get('/users',AuthController.verifyToken,UserController.listUser)

app.put('/users/:id',AuthController.verifyToken,UserController.updateUser)



app.listen(3003);

// console.log(dbConfig);
//promise set
//  var promiseVal = new Promise(function(resolve,reject){
//  	setTimeout(function(){
//  		// reject(10);
// 		resolve(10);
//  	},3000)
//  })
// console.log(promiseVal);

//ended promise






//params data send

// console.log(app);
// app.get('/hospitallist/:id',function (req, res,next) {
// 	console.log(req.params);
// 	res.send('req recived');
// })


// app.get('/hospitallist',function (req, res,next) {
// 	console.log(req.query);
// 	res.send('req recived');
// })


module.exports = app;