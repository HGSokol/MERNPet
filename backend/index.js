import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoutes from './routes/auth-routes.js';

const Port = process.env.PORT;
const MongoPass = process.env.MONGO_PASS;
const MongoAcc = process.env.MONGO_ACC;

const app = express();

app.use(express.json());
app.use(authRoutes);

try {
  app.listen(Port, (err) => {
    err
      ? console.log(`Ошибка запуска сервера: ${err}`)
      : console.log(`Сервер запущен на порту: ${Port}`);
  });
} catch (error) {
  console.log(error);
}
