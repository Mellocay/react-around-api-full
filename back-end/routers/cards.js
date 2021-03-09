const express = require('express');
const cardRouter = express.Router();
const { celebrate, Joi } = require('celebrate');

const { 
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike
} = require('../controllers/cardControllers');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', 
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }), createCard);

cardRouter.put('/cards/likes/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }), addLike);

cardRouter.delete('/cards/likes/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }), removeLike);

cardRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardRouter;
