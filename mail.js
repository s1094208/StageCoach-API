'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'gz7kxb5j2dbmbpaw@ethereal.email',
        pass: 'zezwkbnAUQ4EC13ha4'
    }
});

module.exports = transporter;
