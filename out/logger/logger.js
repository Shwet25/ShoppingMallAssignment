"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// import appRoot from "app-root-path";
// const appRoot : any = require('app-root-path');
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    const env = 'development'; // can be changes to prod
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [
    // new winston.transports.Console(),
    new winston_1.default.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    // new winston.transports.File({ filename: 'logs/all.log' }),
];
const logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
exports.default = logger;
