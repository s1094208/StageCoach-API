process.env.NODE_ENV = 'test';

const db = require('../models/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);



describe('Users endpoints:', () => {
  beforeEach((done) => {
    db.User.destroy({where: {id: '%'}}).then((err) => {
      done();
    });
  });

  describe('/GET users;', () => {
    it('Should return all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    describe('/POST user;', () => {
      it('Should store a new user', (done) => {
        let user = {
          id: "A.Manen",
          firstName: "Alex",
          middleName: "van",
          lastName: "Manen",
          email: "Manen.A@hsleiden.nl",
          phone: "0699322322",
          password: "Password1!"
        };

        chai.request(server)
          .post('/api/users')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
