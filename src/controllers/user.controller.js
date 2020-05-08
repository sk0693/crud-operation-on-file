const httpStatus = require('http-status');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
};

module.exports = {
  createUser
};