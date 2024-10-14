const models = require("../models");

async function test(req, res) {
  // One to one - 1:1 - a user has one address, or an address belongs to only one user
  // One to many - 1:m - a user has many posts
  // Many to many - m:m - a post belongs to many categories

  //One to one

  const user = await models.User.findByPk(8);
  res.status(200).json({
    data: user,
  });
}

module.exports = {
  test: test,
};
