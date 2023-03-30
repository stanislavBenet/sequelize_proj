const { Task } = require('../models');
const { Op } = require('sequelize');

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    const allTasks = await Task.findAll({ ...paginate });
    res.status(200).send({ data: { allTasks } });
    if (!allTasks) {
      const errore = createError(404, 'not found');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const task = await userInstance.createTask(body);
    res.status(201).send({ data: task });
    if (!task) {
      const errore = createError(400, 'check your data');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, paginate = {} } = req;
    const tasks = await userInstance.getTasks({ ...paginate });
    res.status(200).send({ data: tasks });
    if (!userInstance) {
      const errore = createError(404, 'Tasks not found');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { idTask },
    } = req;
    const [rowsCount, [updateTask]] = await Task.update(body, {
      where: {
        id: { [Op.eq]: idTask },
      },
      returning: true,
    });
    res.status(202).send({ data: updateTask });
    if (!updateTask) {
      const errore = createError(400, 'check your data');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserTask = async (req, res, next) => {
  try {
    const {
      taskInstance,
      params: { idUser },
    } = req;

    const deleteTask = await taskInstance.destroy({
      where: {
        user_id: idUser,
      },
    });
    res.status(200).send({ data: taskInstance });
    if (!taskInstance) {
      const errore = createError(400, 'task not found');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getOneUserTasks = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const oneTask = await Task.findByPk(idTask);
    res.status(200).send({ data: oneTask });
    if (!oneTask) {
      const errore = createError(404, 'task not found');
      return next(errore);
    }
  } catch (error) {
    next(error);
  }
};
