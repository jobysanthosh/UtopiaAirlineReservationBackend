var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../main');
var should = chai.should();

chai.use(chaiHttp);

describe('Payment Endpoints', function () {
    it('should list ALL payments on /payment GET', function (done) {
        chai.request(server)
            .get('/payment')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should list a SINGLE payment on /payment/{id} GET', function (done) {
        chai.request(server)
            .get('/payment/' + '2')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('userId');
                res.body.data.should.have.property('cardNumber');
                res.body.data.should.have.property('cardType');
                res.body.data.should.have.property('nameOnCard');
                done();
            });
    });

    it('should add a SINGLE payment on /payment POST', function (done) {
        chai.request(server)
            .post('/payment')
            .send({ 'userId': '8', 'cardNumber': 'test', 'cardType': 'test', 'expirationDate': '2020-01-01', 'nameOnCard': 'test', })
            .end(function (err, res) {
                res.should.have.status(201);
                 res.should.be.json;
                 res.body.should.be.a('object');
                 res.body.should.have.property('data');
                 res.body.data.should.have.property('userId');
                res.body.data.should.have.property('cardNumber');
                res.body.data.should.have.property('cardType');
                res.body.data.should.have.property('nameOnCard');
                done();
            });
    });

    it('should update a SINGLE payment on /payment/<id> PUT', function (done) {
        chai.request(server)
            .put('/payment/')
            .set({ 'id': '8', 'Content-Type': 'application/json', 'Accept': 'application/json' })
            .send({ 'cardNumber': 'udpate', 'cardType': 'udpate', 'expirationDate': '2020-01-01', 'nameOnCard': 'update', })
            .end(function (error, response) {
                if (error) {
                    console.log("error");
                    done(error);
                }
                else {
                    response.should.have.status(201);
                    done();
                }
            });
    });

    it('should delete a SINGLE payment on /payment/<id> DELETE', function (done) {
        chai.request(server)
            .delete('/payment/')
            .set({ 'id': '8', 'Content-Type': 'application/json', 'Accept': 'application/json' })
            .end(function (error, response) {
                if (error) {
                    console.log("error");
                    done(error);
                }
                else {
                    response.should.have.status(200);
                    done();
                }
            });
    });
});