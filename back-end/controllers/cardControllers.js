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
      if (!card) {
        throw new NotFoundError('Imaginary card detected.  No such card found');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
