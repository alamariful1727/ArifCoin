"use strict";
const Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
	NODE_ENV: Joi.string()
		.allow(["development", "production", "test", "provision"])
		.default("development"),
	PORT: Joi.number().default(4040),
	MONGO_HOST: Joi.string()
		.required()
		.description("Mongo DB host url"),
	MONGO_LOCALHOST: Joi.string()
		.required()
		.description("Mongo DB localhost url"),
	MONGO_PORT: Joi.number().default(27017)
})
	.unknown()
	.required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

const config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongo: {
		host: envVars.MONGO_HOST,
		localhost: envVars.MONGO_LOCALHOST,
		port: envVars.MONGO_PORT
	}
};

module.exports = config;
