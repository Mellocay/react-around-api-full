const express = require('express');
const userRouter = express.Router();
const {
  getUsers, getOneUser, getCurrentUser, updateUser, updateAvatar,
} = require('../controllers/userControllers');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);
userRouter.get('users/:id', getOneUser);

module.exports = userRouter;
