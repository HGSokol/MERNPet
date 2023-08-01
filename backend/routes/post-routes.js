import express from 'express';
import multer from 'multer';

import { PostController } from '../controller/index.js';
import * as PostValidations from '../validations/post.js';
import { checkAuth, authError } from '../utils/index.js';

const route = express.Router();

// создание хранилища
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

route.get('/api/posts', checkAuth, authError, PostController.getAllPosts);
route.get('/api/posts/:id', checkAuth, authError, PostController.getPost);
route.post(
  '/api/posts',
  PostValidations.postCreateValidation,
  checkAuth,
  authError,
  PostController.createPost,
);
route.put('/api/posts/:id', checkAuth, authError, PostController.updatePost);
route.delete('/api/posts/:id', checkAuth, authError, PostController.deletePost);

route.post('/api/upload', checkAuth, authError, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

export default route;
