const { Joi } = require('celebrate');
const { urlPattern } = require('../settings/constants');

module.exports.ruleCreateCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlPattern),
  }),
};

module.exports.ruleParamsContainsCardId = {
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
};
