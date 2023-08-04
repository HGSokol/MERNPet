import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth-routes.js';
import postRoutes from './routes/post-routes.js';

const Port = process.env.PORT;
const MongoPass = process.env.MONGO_PASS;
const MongoAcc = process.env.MONGO_ACC;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('backend/uploads'));
app.use(authRoutes);
app.use(postRoutes);

mongoose
  .connect(
    `mongodb+srv://${MongoAcc}:${MongoPass}@testcase.4m6jw4x.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Подключение к БД');

    app.listen(Port, (err) => {
      err
        ? console.log(`Ошибка запуска сервера: ${err}`)
        : console.log(`Сервер запущен на порту: ${Port}`);
    });
  })
  .catch((e) => console.log(`Ошибка подключения к БД: ${e}`));
