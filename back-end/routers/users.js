const express = require('express');
const {
  getUsers, getOneUser, getCurrentUser, updateUser,
} = require('../controllers/userControllers.js');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getOneUser);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/me', updateUser);

module.exports = userRouter;
