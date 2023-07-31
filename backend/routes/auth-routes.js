import express from 'express';

import { registerValidation, loginValidation, meValidation } from '../validations/auth.js';
import { login, registration, checkMe } from '../controller/auth-controller.js';
import checkToken from '../utils/checkAuth.js';

const route = express.Router();

route.post('/api/login', loginValidation, login);
route.post('/api/registration', registerValidation, registration);
route.get('/api/me', meValidation, checkToken, checkMe);

export default route;
