const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserById = (req, res, next) => {
  let id = req.params.id;
  db.User.findById(id, {include: "Roles"}).then(result => {
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
    console.log(result);
    res.status(200).json({});
  }).catch(error => {
    console.log(error);
    res.status(422).json({message: error.message});
  });
};

exports.login = (req, res, next) => {
  db.User.findOne({where: {email: req.body.email}, raw: true}).then(user => {
    if (!user) {
      res.status(401).json({message: 'Unauthorized'});
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, bcryptRes) {
        if (bcryptRes === true) {
          user.password = undefined;
          res.status(200).json({
            message: 'Auth successful',
            token: jwt.sign({user: user}, process.env.JWT_KEY, {expiresIn: '1h'})
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
