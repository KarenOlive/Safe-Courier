import express from 'express';
export const usersRoutes = express.Router();

import {checkAuth} from '../middleware/check-auth.js';

import {show_decoded_token_data, user_signup, user_login} from '../controllers/users.js';

usersRoutes.get('/auth', checkAuth, show_decoded_token_data);

usersRoutes.post('/auth/signup', user_signup);

usersRoutes.post('/auth/login', user_login);









