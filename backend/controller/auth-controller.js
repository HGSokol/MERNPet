import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { token, email, password } = req.body;

  const jwtDecode = jwt.verify(token, process.env.SECRET);
  if (email !== jwtDecode.email) return res.sendStatus(401);

  res.status(200).json({
    token: jwtDecode,
    message: 'вошли',
  });
};

export const registration = (req, res) => {
  const { email, password } = req.body;

  const jwtSend = jwt.sign({ email }, process.env.SECRET);

  res.status(201).json({
    token: jwtSend,
    message: 'Пользователь успешно создан',
  });
};
