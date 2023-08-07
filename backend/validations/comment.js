import { body } from 'express-validator';

export const commentCreateValidation = [
  body('idPost', 'Введите id поста').notEmpty().isString(),
  body('text', 'Введите текст комментария').notEmpty().isString(),
];
export const commentDeleteValidation = [
  body('idPost', 'Введите id поста').notEmpty().isString(),
  body('idComment', 'Введите id комментария').notEmpty().isString(),
];
