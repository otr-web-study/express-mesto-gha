const { ObjectNotFoundError } = require('../errors/errors');
const ForbiddenError = require('../errors/ForbiddenError');

const handleObjectNotFound = (obj) => {
  if (!obj) {
    throw new ObjectNotFoundError();
  }
  return obj;
};

const handleError = (err, res) => {
  const message = {
    message: `Произошла ошибка: ${err.name} - ${err.message}`,
  };

  if (err.name === 'ObjectNotFoundError') {
    res.status(404).send(message);
    return;
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send(message);
    return;
  }
  res.status(500).send(message);
};

const isCurrentUserOwner = (req, obj) => {
  if (obj.owner._id !== req.user._id) {
    throw new ForbiddenError();
  }
  return obj;
};

module.exports = {
  handleObjectNotFound,
  handleError,
  isCurrentUserOwner,
};
