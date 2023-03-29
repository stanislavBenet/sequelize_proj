const { Router } = require('express');
const UserController = require('./controllers/user.controller.js');
const router = Router();

//method & controllers
//http://localhost:3000/api/test

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:idUser', UserController.getOneUser);
router.patch('/users/:idUser', UserController.updateUser);
router.patch('/users/instance/:idUser', UserController.updateUserInstance);
router.delete('/users/:idUser', UserController.deleteUser);
module.exports = router;
