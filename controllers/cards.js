const Card = require('../models/card');
const { handleObjectNotFound, handleError, isCurrentUserOwner } = require('../utils/utils');

const updateCard = (res, cardId, data) => {
  Card.findByIdAndUpdate(cardId, data, {
    new: true, runValidators: true,
  })
    .then(handleObjectNotFound)
    .then((card) => card.populate(['owner', { path: 'likes' }]))
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', { path: 'likes' }])
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => card.populate(['owner', { path: 'likes' }]))
    .then((card) => res.status(201).send(card))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then(handleObjectNotFound)
    .then(isCurrentUserOwner)
    .then((card) => card.remove())
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  updateCard(res, cardId, { $addToSet: { likes: req.user._id } });
};

module.exports.unlikeCard = (req, res) => {
  const { cardId } = req.params;

  updateCard(res, cardId, { $pull: { likes: req.user._id } });
};
