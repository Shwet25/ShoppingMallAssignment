"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shoppingMallController_1 = __importDefault(require("../controllers/shoppingMallController"));
var paths;
exports.default = paths = express_1.default.Router();
paths.post('/register', shoppingMallController_1.default.register);
paths.post('/login', shoppingMallController_1.default.login);
paths.post('/validate', shoppingMallController_1.default.validate);
paths.get('/employees', shoppingMallController_1.default.employees);
// paths.get('/read', crud.read);
// paths.put('/update', crud.update);
// paths.delete('/delete', crud.delete);
// paths.get('/test',crud.test)
// module.exports=paths;
