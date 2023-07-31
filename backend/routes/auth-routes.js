import express from 'express';

import * as AuthValidation from '../validations/auth.js';
import * as AuthController from '../controller/auth-controller.js';
import checkToken from '../utils/checkAuth.js';

const route = express.Router();

route.post('/api/login', AuthValidation.loginValidation, AuthController.login);
route.post('/api/registration', AuthValidation.registerValidation, AuthController.registration);
route.get('/api/me', AuthValidation.meValidation, checkToken, AuthController.checkMe);

export default route;
