import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/User.js';

export const login = async (req, res) => {
  const { token, email, password } = req.body;

  const candidate = await User.findOne({ email });
  if (!candidate) {
    return res.status(401).json({ message: 'пользователя с таким email не существует' });
  }

  const jwtDecode = jwt.verify(token, process.env.SECRET);

  if (candidate._id.toString() !== jwtDecode._id) {
    return res.status(401).json({ message: 'не правильный токен' });
  }

  res.status(200).json({
    token: token,
    message: 'успешный вход в систему',
  });
};

export const registration = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.find({ email });
  if (candidate.length > 0) {
    return res.status(401).json({ message: 'такой пользователь уже существует' });
  }

  const hashPassword = bcryptjs.hashSync(password, 7);

  const user = new User({ email, password: hashPassword });
  const { _id } = await user.save();

  const jwtSend = jwt.sign({ _id }, process.env.SECRET);

  res.status(201).json({
    token: jwtSend,
    message: 'Пользователь успешно создан',
  });
};
