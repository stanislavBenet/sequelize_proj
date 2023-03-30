const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:idUser', checkUser, UserController.getOneUser);
userRouter.patch('/:idUser', checkUser, UserController.updateUser);
userRouter.delete('/:idUser', UserController.deleteUser);

module.exports = userRouter;
