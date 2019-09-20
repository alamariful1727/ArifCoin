"use strict";
const winston = require("winston");

const logger = new winston.createLogger({
	transports: [
		new winston.transports.Console({
			json: true,
			colorize: true
		})
	]
});

module.exports = logger;
