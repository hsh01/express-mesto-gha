const { Joi } = require('celebrate');

const UserAuthSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const UserCreateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({
      scheme: [
        /https?/,
      ],
    }),
  }),
};

const UserProfileSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const UserAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().required().uri({
      scheme: [
        /https?/,
      ],
    }),
  }),
};

const UserIdParamSchema = {
  body: Joi.object().keys({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
};

module.exports = {
  UserAuthSchema, UserProfileSchema, UserAvatarSchema, UserCreateSchema, UserIdParamSchema,
};
