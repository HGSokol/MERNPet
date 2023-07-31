import express from 'express';
import { login, registration } from '../controller/auth-controller.js';

const route = express.Router();

route.post('/api/login', login);
route.post('/api/registration', registration);

export default route;
