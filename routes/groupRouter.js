const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const GroupController = require('../controllers/group.controllers');

/* const upload = multer({
  dest: path.resolve(__dirname, '../public/images'),
}); */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const groupRouter = Router();

groupRouter.post('/', upload.single('image'), GroupController.createUserGroup);
groupRouter.get('/users/:idUser', GroupController.getUserGroup);

//PATCH http://localhost:3000/api/groups/1/image
groupRouter.patch(
  '/:idGroup/image',
  upload.single('image'),
  GroupController.addImageGroup
);

module.exports = groupRouter;
