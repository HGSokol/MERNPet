import User from '../model/User.js';

export default async (req, res, next) => {
  const candidate = await User.findById(req.userId);
  if (!candidate) {
    return res.status(404).json({
      message: 'Пользователь не найден',
    });
  }
  next();
};
