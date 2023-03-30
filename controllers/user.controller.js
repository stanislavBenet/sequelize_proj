const createError = require('http-errors');
const { User } = require('../models');
const { Op } = require('sequelize');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    res.status(201).send({ data: createdUser });
    if (!createdUser) {
      const errore = createError(404, 'Check your data');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).send({ data: allUsers });
    if (!allUsers) {
      const errore = createError(404, 'error');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const updateUser = await userInstance.update(body, {
      returning: true,
    });
    userInstance.password = undefined;
    if (!updateUser) {
      const errore = createError(400, 'check ypur data');
      return next(errore);
    }
    res.status(202).send({ data: updateUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);
    await userInstance.destroy({
      where: {
        id: idUser,
      },
    });
    res.status(200).send({ data: userInstance });
    userInstance.password = undefined;
    if (!userInstance) {
      const errore = createError(404, 'User not found');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getOneUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const oneUser = await User.findByPk(idUser);
    res.status(200).send({ data: oneUser });
    if (!oneUser) {
      const errore = createError(404, 'User not found');
      return next(errore);
    }
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
