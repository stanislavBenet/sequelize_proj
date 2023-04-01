const createError = require('http-errors');
const { Task } = require('../models');

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const taskInstance = await Task.findByPk(idTask);
    if (!taskInstance) {
      const errore = createError(404, 'User not found');
      return next(errore);
    }
    req.taskInstance = taskInstance;
    next();
  } catch (error) {
    next(error);
  }
};
