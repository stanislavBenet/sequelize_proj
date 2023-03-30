const { User } = require('../models');
const createError = require('http-errors');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);
    if (!userInstance) {
      const errore = createError(404, 'User not found');
      return next(errore);
    }
    req.userInstance = userInstance;
    next();
  } catch (error) {
    next(error);
  }
};
