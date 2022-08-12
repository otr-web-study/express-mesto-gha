const User = require('../models/user');
const { handleObjectNotFound, handleError } = require('../utils/utils');

const updateUser = (res, userId, data) => {
  User.findByIdAndUpdate(userId, data, {
    new: true, runValidators: true,
  })
    .then(handleObjectNotFound)
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(handleObjectNotFound)
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  updateUser(res, userId, { name, about });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  updateUser(res, userId, { avatar });
};
