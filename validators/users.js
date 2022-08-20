const { Joi } = require('celebrate');
const { urlPattern } = require('../settings/constants');

module.exports.ruleCreateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports.ruleUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

module.exports.ruleUpdateAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
};

module.exports.ruleParamsContainsUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
};

module.exports.ruleLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};
