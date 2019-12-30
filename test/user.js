
var chai = require('chai');
var chaiHTTP = require('chai-http');
var should = chai.should();
var server = require('../index.js');
chai.use(chaiHTTP);



describe('Users', function() {
    describe('POST user registration', function() {
        it('should register a user, provided uique username', function(done){
            chai.request(server)
                .post('/registration')
                .set('content-type','application/x-www-form-urlencoded')
                .send({
                    username:'saroj',
                    password:'test'
                })
                .end(function(err,res){
                    // res.epet.status(20201)
                    res.should.have.status(200);
                    done();
                });
        });
    });


});
