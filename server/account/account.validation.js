const Joi = require('@hapi/joi');
const accountInfo = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .lowercase()
    .required(),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .error(errors => {
      return {
        message: 'Confirm Password should match with Password',
      };
    }),
  contactNo: Joi.string()
    .regex(/\+?(88)?0?1[356789][0-9]{8}/)
    .required(),
});
module.exports = {
  register: Joi.object().keys({
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .regex(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .lowercase()
        .required()
        .error(errors => {
          return {
            success: false,
            message: 'mail id is not valid format',
          };
        }),
      password: Joi.string()
        .regex(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,}).{8,}$/)
        .required()
        .error(error => {
          return {
            success: false,
            message:
              'Password should contain Uppercase, Lowercase, Special character, Number',
          };
        }),
      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required(),
      contactNo: Joi.string()
        // .regex(/\+?(88)?0?1[356789][0-9]{8}/)
        .required(),
    }),
  }),

  login: Joi.object().keys({
    body: Joi.object().keys({
      email: Joi.string()
        .regex(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .email()
        .lowercase()
        .required(),
      password: Joi.string().required(),
    }),
  }),

  update: Joi.object().keys({
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .regex(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .email()
        .lowercase()
        .required(),
      contactNo: Joi.string()
        .regex(/\+?(88)?0?1[356789][0-9]{8}/)
        .required(),
    }),
  }),
};
