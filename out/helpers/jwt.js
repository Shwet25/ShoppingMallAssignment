"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const JWTSECRET = 'my-32-character-ultra-secure-and-ultra-long-secret';
const signToken = (payload) => {
    return jwt.sign(payload, JWTSECRET);
};
const verifyToken = (token) => {
    return jwt.verify(token, JWTSECRET);
};
exports.default = signToken;
