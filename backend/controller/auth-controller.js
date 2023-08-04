import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User from '../model/User.js';

export const login = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: 'не правильно введенные данные',
        ...error,
      });
    }

    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: 'Пользователя не найден' });
    }

    const isValidPass = await bcrypt.compare(password, candidate.password);
    if (!isValidPass)
      return res.status(400).json({ message: 'Не верный логин или пароль' });

    const { password: hashPass, ...user } = candidate._doc;
    const jwtSend = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      ...user,
      token: jwtSend,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'не удалось авторизоваться',
    });
  }
};

export const registration = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: 'не правильно введенные данные',
        ...error,
      });
    }

    const { email, password, avatarUrl = null } = req.body;

    const candidate = await User.find({ email });
    if (candidate.length > 0) {
      return res
        .status(401)
        .json({ message: 'такой пользователь уже существует' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      ...req.body,
      ...{ avatarUrl, password: hashPassword },
    });
    const { _id } = await user.save();

    const jwtSend = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });

    res.status(201).json({
      ...user,
      token: jwtSend,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'не удалось зарегистрироваться',
    });
  }
};

export const checkMe = async (req, res) => {
  try {
    const candidate = await User.findById(req.userId);
    if (!candidate) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { password, ...user } = candidate._doc;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось получить информацию о пользователе',
    });
  }
};
