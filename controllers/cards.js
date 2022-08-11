const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', { path: 'likes' }])
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.name} - ${err.message}`,
    }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => card.populate(['owner', { path: 'likes' }]))
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.name} - ${err.message}`,
    }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(() => res.send())
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.name} - ${err.message}`,
    }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, {
    new: true, runValidators: true,
  })
    .then((card) => card.populate(['owner', { path: 'likes' }]))
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.name} - ${err.message}`,
    }));
};

module.exports.unlikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, {
    new: true, runValidators: true,
  })
    .then((card) => card.populate(['owner', { path: 'likes' }]))
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.name} - ${err.message}`,
    }));
};
