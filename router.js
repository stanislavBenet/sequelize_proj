const { Router } = require('express');
const UserController = require('./controllers/user.controller.js');
const router = Router();

//method & controllers
//http://localhost:3000/api/test

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers)
module.exports = router;
