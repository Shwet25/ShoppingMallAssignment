const jwt = require("jsonwebtoken");

const JWTSECRET = 'my-32-character-ultra-secure-and-ultra-long-secret';

const signToken = (payload:any) => {
	return jwt.sign(payload, JWTSECRET);
};

const verifyToken = (token:any) => {
	return jwt.verify(token, JWTSECRET);
};

export default signToken ;
