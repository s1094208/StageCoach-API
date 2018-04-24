const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/:id', checkAuthentication, userController.getUserById);

router.put('/:id', checkAuthentication, userController.update);

router.post('/signup', userController.create);
router.post('/login', userController.login);

module.exports = router;
