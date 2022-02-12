"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { transports, createLogger } = require('winston');
const logConfiguration = {
    // format:format.printf(info => `[${Date()}],[${info.level.toUpperCase()}],[${path.basename(__filename)}],${info.message}`),
    transports: [
        new transports.File({
            level: 'error',
            filename: 'logs/error.log'
        }),
        new transports.File({
            level: 'info',
            filename: 'logs/info.log'
        })
    ]
};
const logger = createLogger(logConfiguration);
exports.default = logger;
