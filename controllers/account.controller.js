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

  db.Account.findOne({where: {email: email}, include: {association: 'user'}})
    .then(account => {

    const generatedToken = crypto.randomBytes(16).toString('hex');

    if (account) {
      db.Account.update({passwordResetToken: generatedToken}, {where: {email: email}}).then(result => {

        const message = {
          from: 'stagecoach@hsleiden.nl',
          to: email,
          subject: 'Account recovery requested',
          html: 'Hello ' + account.user.firstName + '<br><br>'
          + 'You have requested a password reset, you can do this by following the link underneath or by navigating to the address and entering the given token manually. <br>'
          + '<a href="http://localhost:4200/auth/reset/' + generatedToken + '">localhost:4200/auth/reset/' + generatedToken + '</a><br>'
          + 'or <br>'
          + 'token: ' + generatedToken + '<br><br>'
          + 'Cheerio <br>'
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
    } else {
      res.status(200).json({message: "email sent"});
    }
  });
};

exports.resetPassword = (req, res, next) => {
  db.Account.update({password: req.body.password, passwordResetToken: null}, {where: {passwordResetToken: req.body.token}})
    .then(result => {
      res.status(200).json({message: "Password change succesful"});
    })
    .catch(error => {
      res.status(404).json({message: "Could not verify the integrity of the token"});
    });
};
