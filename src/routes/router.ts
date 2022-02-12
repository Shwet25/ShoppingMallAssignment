import express from 'express';
import shoppingMallController from '../controllers/shoppingMallController';
var paths;

export default paths = express.Router();

paths.post('/register', shoppingMallController.register);
paths.post('/login', shoppingMallController.login);
paths.post('/validate', shoppingMallController.validate);
paths.get('/employees', shoppingMallController.employees);
paths.put('/update', shoppingMallController.update);
paths.delete('/delete', shoppingMallController.delete);

