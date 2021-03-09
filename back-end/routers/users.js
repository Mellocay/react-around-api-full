const express = require('express');
const userRouter = express.Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getOneUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/userControllers');

userRouter.get('/users', getUsers);
userRouter.get('/users/me',
  celebrate({
    body: Joi.object().keys({
      email:Joi.string().required().email(),
    }),
  }), getCurrentUser);

userRouter.patch('/users/me', 
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }), updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);

userRouter.get('users/:id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
  }), getOneUser);

module.exports = userRouter;
