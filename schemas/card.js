const { Joi } = require('celebrate');

const CardInSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri({
      scheme: [
        /https?/,
      ],
    }),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

const CardDeleteSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports = { CardInSchema, CardDeleteSchema };
