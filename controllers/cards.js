const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка: ${err.name} - ${err.message}`,
    }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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
