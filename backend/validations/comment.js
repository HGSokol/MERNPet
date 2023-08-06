import { body } from 'express-validator';

export const commentCreateValidation = [
  body('idPost', 'Введите заголовок статьи').isString(),
  body('text', 'Введите текст комментария').isLength({ min: 1 }).isString(),
];
