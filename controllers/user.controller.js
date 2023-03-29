const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).send(allUsers);
  } catch (error) {
    next(error);
  }
};

/* module.exports.createUser = async (req, res, next) => {
    try {
      
  } catch (error) {
    next(error);
  }
}; */
