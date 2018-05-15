process.env.NODE_ENV = 'test';

const db = require('../models/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);


describe('Users endpoints:', () => {
    beforeEach((done) => {
        db.User.destroy({where: {}}).then((err) => {
            done();
        });
    });

    /*describe('/GET users;', () => {
      it('Should return all users', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });

    });*/

    describe('/POST user;', () => {
        it('Should store a new user', (done) => {
            let user = {
                id: "s1094208",
                firstName: "Anna",
                middleName: "",
                lastName: "Verbree",
                email: "s1094208@student.hsleiden.nl",
                phone: "0611111111",
                password: "Password1!",
                roleTitle: "Student",
                userId: "s1094208"
            };

            chai.request(server)
                .post('/api/users/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Should not store a new user without phone field', (done) => {
            let user = {
                id: "s1094208",
                firstName: "Anna",
                middleName: "",
                lastName: "Verbree"
            };

            chai.request(server)
                .post('/api/users/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.have.property('errors');
                    res.body.message.errors[0].should.have.property('path').eql('phone');
                    res.body.message.errors[0].should.have.property('validatorName').to.be.null;
                    done();
                });
        });
    });
});
