const express = require('express');
const router = express.Router();
const db = require('../models/index');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', (req, res, next) => {
  db.User.findAll({raw: true}).then(result => {
    res.status(200).json(result);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  db.User.findById(id, {raw: true}).then(result => {
    if (result == null) {
      res.status(404).json({message: 'Couldn\'t find a user with the id: ' + id});
    } else {
      res.status(200).json(result);
    }
  });
});

router.post('/', (req, res, next) => {
  let user = req.body;
  db.User.create(user).then((result) => {
    console.log(result);
    res.status(200).json({});
  }).catch(error => {
    console.log(error);
    res.status(422).json({message: error.message});
  });
});

module.exports = router;
