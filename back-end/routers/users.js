const express = require('express');
const userRouter = express.Router();
const {
  getUsers, getOneUser, getCurrentUser, updateUser
} = require('../controllers/userControllers');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUser);
userRouter.get('/:id', getOneUser);

module.exports = userRouter;
