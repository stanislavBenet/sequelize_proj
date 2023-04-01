const { Router } = require('express');
const GroupController = require('../controllers/group.controllers');

const groupRouter = Router();

groupRouter.post('/', GroupController.createUserGroup);
groupRouter.get('/users/:idUser', GroupController.getUserGroup);

module.exports = groupRouter;
