const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const { handleObjectNotFound } = require('../utils/utils');
const { urlPattern } = require('../settings/constants');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина значения: 2'],
    maxlength: [30, 'Максимальная длина значения: 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина значения: 2'],
    maxlength: [30, 'Максимальная длина значения: 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    match: urlPattern,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    unique: [true, 'Пользователь с таким email уже существует.'],
    validate: [isEmail, 'Некорректный email.'],
  },
  password: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(handleObjectNotFound)
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.resolve(new AuthError());
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
