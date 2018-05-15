const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../mail.js');
const account = require('./account.controller.js');

exports.getUserById = (req, res, next) => {
  let id = req.params.id;
  db.User.findById(id, {
    include: [
      { association: 'roles', through: {attributes: []} },
      { association: 'account', attributes: ['email', 'createdAt', 'updatedAt'] },
    ]
  }).then(result => {
    if (result == null) {
      res.status(404).json({message: 'Couldn\'t find a user with the id: ' + id});
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getAll = (req, res, next) => {
  db.User.findAll({raw: true}).then(result => {
    res.status(200).json(result);
  });
};

exports.create = (req, res, next) => {
  let user = req.body;
  db.User.create(user).then((result) => {
    db.Account.create(user).then((result) => {
        db.UserRoles.create(user).then((result) => {
            console.log('En dan nu een email versturen');
            account.sendVerificationEmail(user);
        });
    });
      res.status(200).json({});

  }).catch(error => {
    console.log(error);
    res.status(422).json({message: error});
  });
};

exports.update = (req, res, next) => {
  let user = req.body;

  db.User.update(user, {where: {id: req.accountData.userId}, returning: true}).then(result => {
    res.status(200).json({message: 'User updated', user: result[1][0]});
  }).catch(error => {
    console.log(error);
    res.status(406).json({message: 'Could not update user'});
  });

}

exports.login = (req, res, next) => {
  db.Account.findOne({where: {email: req.body.email}, raw: true}).then(account => {
    if (!account) {
      res.status(401).json({message: 'Unauthorized'});
    } else {
      bcrypt.compare(req.body.password, account.password, function (err, bcryptRes) {
        if (bcryptRes === true) {
          account.password = undefined;
          res.status(200).json({
            message: 'Auth successful',
            token: jwt.sign({account: account}, process.env.JWT_KEY, {expiresIn: '1h'})
          });
        } else {
          res.status(401).json({
            message: 'Unauthorized'
          });
        }
      })
    }
  }).catch(error => {
    console.log(error);
    res.status(422).json({message: error.message});
  });
};
