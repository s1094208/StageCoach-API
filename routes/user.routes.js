const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

router.get('/', checkAuthentication, userController.getAll);
router.get('/:id', checkAuthentication, userController.getUserById);

router.put('/:id', checkAuthentication, userController.update);

router.post('/signup', userController.create);
router.post('/login', userController.login);

router.get('test', (req, res, next) => {
    res.send('Updated')
});

module.exports = router;
