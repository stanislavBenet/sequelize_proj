const { Task } = require('../models');
const { Op } = require('sequelize');

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    const allTasks = await Task.findAll({ ...paginate });
    res.status(200).send({ data: { allTasks } });
  } catch (error) {
    next(error);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const task = await userInstance.createTask(body);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, paginate = {} } = req;
    const tasks = await userInstance.getTasks({ ...paginate });
    res.status(200).send({ data: tasks });
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
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      taskInstance,
      params: { idUser },
    } = req;

    const deleteTask = await taskInstance.destroy({
      where: {
        user_id: idUser,
      },
    });
    res.status(200).send({ data: taskInstance });
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
  } catch (error) {
    next(error);
  }
};
