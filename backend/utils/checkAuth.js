import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export default async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }

    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded;

        next();
      } catch (error) {
        return res.status(403).json({
          message: 'Нет доступа',
        });
      }
    } else {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Вы не авторизованы',
    });
  }
};
