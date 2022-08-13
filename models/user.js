const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    minlength: [2, 'Минимальная длина значения: 2'],
    maxlength: [30, 'Максимальная длина значения: 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    minlength: [2, 'Минимальная длина значения: 2'],
    maxlength: [30, 'Максимальная длина значения: 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
  },
});

module.exports = mongoose.model('user', userSchema);
