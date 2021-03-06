const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/NotFoundError');

function getCards(req, res, next) {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

function deleteCard(req, res, next) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (String(card.owner) !== req.user._id) {
        throw new NotAuthorizedError('You may not delete cards that are not yours.');
      }
      if (card === null) {
        throw new NotFoundError('card not found')
      }
      res.send({message:'card deleted'})
    })
    .catch(next);
}

function addLike(req, res, next) {
  let user = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.likes.includes(user)) {
        throw new BadRequestError('You have already liked this card')
      }
      Card.findByIdAndUpdate(card._id,
        { $addToSet: { 'likes': user} }, { new: true, runValidators: true})
      .then(card => res.send(card))
    })
    .catch(next)
}

function removeLike(req, res, next) {
  let user = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.likes.includes(user)) {
        throw new BadRequestError("this card is not liked")
      }
      Card.findByIdAndUpdate(card._id,
        { $pull: { 'likes': user } },
        { new: true })
        .then(card => res.send(card))
    })
    .catch(next)
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
