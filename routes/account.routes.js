const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middleware/auth.middleware');
const accountController = require('../controllers/account.controller');

router.get('/', checkAuthentication, accountController.getInfo);

module.exports = router;
