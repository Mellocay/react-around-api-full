const express = require('express');
const userRouter = express.Router();
const {
  getUsers,
  getOneUser,
  getCurrentUser,
  updateUser
} = require('../controllers/userControllers');


userRouter.get('/', getUsers);
userRouter.get('/:id', getOneUser);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUser);

module.exports = userRouter;
