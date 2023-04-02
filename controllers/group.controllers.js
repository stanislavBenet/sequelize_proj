const createError = require('http-errors');
const _ = require('lodash');
const { Group, User } = require('../models');

const checkBody = (body) =>
  _.pick(body, ['name', 'imagePath', 'descriptition', 'isAdult']);

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const {
      body,
      file: { filename },
    } = req;
    const values = checkBody(body);
    const group = await Group.create({ ...values, imagePath: filename });
    if (!group) {
      return next(createError(400, 'bad request'));
    }
    const user = await User.findByPk(body.userId);
    if (!user) {
      return next(createError(404, 'user not found'));
    }
    await group.addUser(user);
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroup = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userWithGroup = await User.findByPk(idUser, {
      include: {
        model: Group,
        through: {
          attributes: [],
        },
      },
    });
    if (!userWithGroup) {
      return next(createError(404, 'user do not have any groups'));
    }
    res.status(200).send({ data: userWithGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.addImageGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      file: { filename },
    } = req;
    const [rowsCount, [updateGroup]] = await Group.update(
      { imagePath: filename },
      {
        where: {
          id: idGroup,
        },
        returning: true,
      }
    );
    res.status(200).send({ data: updateGroup });
  } catch (error) {
    next(error);
  }
};

/* 
module.exports.createUserGroup = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
}; */
