const express = require('express');
const { getCards, createCard, deleteCard, addLike, removeLike } = require('../controllers/cardControllers');

const cardRouter = express.Router();

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', createCard);

cardRouter.put('/cards/likes/:cardId', addLike);

cardRouter.delete('/cards/likes/:cardId', removeLike);

cardRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardRouter;
