import { Router } from 'express';

import * as AuthValidation from '../validations/auth.js';
import { AuthController } from '../controller/index.js';
import { authError, checkAuth } from '../utils/index.js';

const route = Router();

route.post('/api/login', AuthValidation.loginValidation, AuthController.login);
route.post('/api/registration', AuthValidation.registerValidation, AuthController.registration);
route.get('/api/me', AuthValidation.meValidation, checkAuth, authError, AuthController.checkMe);

export default route;
