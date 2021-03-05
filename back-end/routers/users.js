const express = require('express');
const userRouter = express.Router();
const {
  getUsers, getOneUser, getCurrentUser, updateUser
} = require('../controllers/userControllers');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', updateUser);
userRouter.get('users/:id', getOneUser);

module.exports = userRouter;
