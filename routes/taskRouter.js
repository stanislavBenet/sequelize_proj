const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');
const paginate = require('../middlewares/paginate.mw');
const taskRouter = Router();

taskRouter.get('/', paginate, TaskController.getAllTasks);

taskRouter.post('/users/:idUser', checkUser, TaskController.createTask);
taskRouter.get(
  '/:idTask/users/:idUser',
  checkUser,
  paginate,
  TaskController.getUserTasks
);
taskRouter.delete(
  '/:idTask/users/:idUser',
  checkUser,
  checkTask,
  TaskController.deleteUserTask
);

module.exports = taskRouter;
