import express from 'express';
import multer from 'multer';

import { PostController } from '../controller/index.js';
import * as PostValidations from '../validations/post.js';
import { checkAuth, authError } from '../utils/index.js';

const route = express.Router();

// создание хранилища
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'backend/uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
// checkAuth, authError,
route.get('/api/posts', PostController.getAllPosts);
// checkAuth, authError,
route.get('/api/posts/:id', checkAuth, authError, PostController.getPost);
route.post(
  '/api/posts',
  PostValidations.postCreateValidation,
  checkAuth,
  authError,
  PostController.createPost
);
route.put('/api/posts/:id', checkAuth, authError, PostController.updatePost);
route.delete('/api/posts/:id', checkAuth, authError, PostController.deletePost);

route.get('/api/tags', PostController.getTags);

route.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

export default route;
