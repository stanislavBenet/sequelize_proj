const { Router } = require('express');
const userRouter = require('../routes/userRouter');
const taskRouter = require('../routes/taskRouter');
const { checkUser } = require('../middlewares/user.mw');
const router = Router();
router.use('/users', userRouter);
router.use('/users/:idUser/tasks', checkUser, taskRouter);

module.exports = router;
