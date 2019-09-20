const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number().default(4040),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  JWT_EXPIRATION: Joi.string()
    .required()
    .description('JWT access token time expire'),
  JWT_REFRESH_EXPIRATION: Joi.string()
    .required()
    .description('JWT refresh token expired'),
  MONGO_HOST: Joi.string()
    .required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
  EMAIL_ADDRESS: Joi.string()
    .required()
    .description('email address required'),
  EMAIL_PASSWORD: Joi.string()
    .required()
    .description('password required'),
  FACEBOOK_ID: Joi.string()
    .required()
    .description('facebook id required'),
  FACEBOOK_SECRET: Joi.string()
    .required()
    .description('facebook secret key required'),
  GOOGLE_CLIENT_ID: Joi.string()
    .required()
    .description('Google client id required'),
  GOOGLE_CLIENT_SECRET: Joi.string()
    .required()
    .description('Google client secret required'),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(
  process.env,
  envVarsSchema,
);
// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpire: envVars.JWT_EXPIRATION,
  jwtRefreshExpire: envVars.JWT_REFRESH_EXPIRATION,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
  emailAddress: envVars.EMAIL_ADDRESS,
  emailPassword: envVars.EMAIL_PASSWORD,
  facebookID: envVars.FACEBOOK_ID,
  facebookSecret: envVars.FACEBOOK_SECRET,
  googleClientID: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
};

module.exports = config;
