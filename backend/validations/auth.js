import { body, header } from 'express-validator';

export const registerValidation = [
  body('email', 'Не корректный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5, max: 25 }),
  body('name', 'Имя должно содержать минимум 2 символа').isLength({ min: 2 }),
  body('lastname', 'Имя должно содержать минимум 2 символа').isLength({ min: 2 }),
  body('avatarUrl', 'Не верная ссылка на изображение').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Не корректный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 5 символов').isLength({ min: 5, max: 25 }),
];

export const meValidation = [
  header('authorization')
    .exists({ checkFalsy: true })
    .withMessage('Missing Authorization Header')
    .bail()
    .contains('Bearer')
    .withMessage('Authorization Token is not Bearer'),
];
