const db = require('../models/index');

exports.getInfo = (req, res, next) => {
  const userId = req.userData.id;

  db.User.findById(userId, {
    include: [{
      association: 'roles', attributes: ['title'], through: {attributes: []},
    }],
    attributes: {exclude: ['password']},
  }).then((result) => {
    transformedResult = JSON.parse(JSON.stringify(result));
    // Turn role objects into array of strings;
    transformedResult.roles = result.roles.map(role => {
      return role.title;
    });
    res.status(200).json(transformedResult);
  });
};
