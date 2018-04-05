const db = require('../models/index');
const mail = require('../mail.js');
const crypto = require('crypto');

exports.getInfo = (req, res, next) => {
  const userId = req.accountData.userId;

  db.User.findById(userId, {
    include: [{
      association: 'roles', attributes: ['title'], through: {attributes: []}
    }, {
      association: 'account', attributes: ['email', 'createdAt', 'updatedAt']
    }],
    //attributes: {exclude: ['password']},
  }).then((result) => {
    const transformedResult = JSON.parse(JSON.stringify(result));
    // Turn role objects into array of strings;
    transformedResult.roles = result.roles.map(role => {
      return role.title;
    });
    res.status(200).json(transformedResult);
  });
};

exports.sendRecoverEmail = (req, res, next) => {
  const email = req.body.email;

  db.Account.findOne({where: {email: email}, include: {association: 'user'}}).then(account => {
    console.log(account);

    const generatedToken = crypto.randomBytes(16).toString('hex');

    if (account) {
      db.Account.update({passwordResetToken: generatedToken}, {where: {email: email}}).then(result => {
        console.log('fuckity');
        console.log(result);

        const message = {
          from: 'stagecoach@hsleiden.nl',
          to: email,
          subject: 'Account recovery requested',
          text: 'Hello ' + account.user.firstName + '\n \n'
          + 'You have requested a password reset, you can do this by following the link underneath or by navigating to the address and entering the given token manually. \n'
          + 'localhost:3000/auth/reset/' + generatedToken + '\n'
          + 'or \n'
          + 'token: ' + generatedToken + '\n \n'
          + 'Cheerio \n'
          + 'Stagecoach bro',
        };

        mail.sendMail(message, (error, info) => {
          if (error) {
              res.status(500)
              return console.log(error);
          } else {
            res.status(200).json('message: email sent');
          }
        });
      });
    }
  });
};
