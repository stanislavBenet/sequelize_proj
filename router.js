const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const TaskController = require('./controllers/task.controller');
const { checkUser } = require('./middlewares/user.mw');
const { checkTask } = require('./middlewares/task.mw');
const router = Router();

//method & controllers
//http://localhost:3000/api/test

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:idUser', UserController.getOneUser);
router.patch('/users/:idUser', UserController.updateUser);
router.patch('/users/instance/:idUser', UserController.updateUserInstance);
router.delete('/users/:idUser', UserController.deleteUser);

router.post('/users/:idUser/tasks', checkUser, TaskController.createTask);
router.get('/users/:idUser/tasks', checkUser, TaskController.getUserTasks);
router.patch('/users/:idUser/tasks/:idTask', checkUser, TaskController.updateUserTask);
router.delete('/users/:idUser/tasks/:idTask', checkUser,checkTask, TaskController.deleteUserTask);
router.get('/users/:idUser/tasks/:idTask', checkUser, TaskController.getOneUserTasks);

module.exports = router;
