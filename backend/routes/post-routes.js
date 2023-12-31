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
route.get('/api/posts', PostController.getAllPosts);
route.get('/api/posts/sort', PostController.getAllPostsOrderedBy);
route.get('/api/posts/:id', checkAuth, authError, PostController.getPost);
route.post(
  '/api/posts',
  PostValidations.postCreateValidation,
  checkAuth,
  authError,
  PostController.createPost
);
route.patch('/api/posts/:id', checkAuth, authError, PostController.updatePost);
route.delete('/api/posts/:id', checkAuth, authError, PostController.deletePost);
route.get(
  '/api/userPosts/:id',
  checkAuth,
  authError,
  PostController.getUserPosts
);
route.post('/api/posts/inc', PostController.getIncPosts);

route.get('/api/tags', PostController.getTags);

route.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

export default route;
