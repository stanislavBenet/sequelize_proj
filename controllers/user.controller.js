const { User } = require('../models');
const { Op } = require('sequelize');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
      /*  where: {
        firstName: 'Brad',
      }, */
    });
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
      body,
    } = req;
    const [rowsCount, [updatedUser]] = await User.update(body, {
      where: {
        id: { [Op.eq]: idUser },
      },
      returning: true,
      attributes: { exclude: ['password'] },
    });
    updatedUser.password = undefined;
    res.status(202).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const {
      params: { idUser },
      body,
    } = req;
    const userInstance = await User.findByPk(idUser);

    const updateUser = await userInstance.update(body, { returning: true });
    updateUser.password = undefined;
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
    userInstance.password = undefined;
    /*   const deleteUser = await userInstance.destroy({
      where: { id: idUser },
    });
     res.status(200).send({ data: deleteUser}); */
    const deleteUser = await userInstance.destroy({
      where: { id: idUser },
    });
    res.status(200).send({ data: userInstance });
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
