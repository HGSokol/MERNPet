import express from 'express';
import multer from 'multer';

import { PostController, CommentController } from '../controller/index.js';
import * as PostValidations from '../validations/post.js';
import * as CommentValidation from '../validations/comment.js';
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
route.post('/api/posts/inc', PostController.getIncPosts);

route.post(
  '/api/comment',
  CommentValidation.commentCreateValidation,
  checkAuth,
  authError,
  CommentController.createComment
);
route.delete(
  '/api/comment',
  CommentValidation.commentDeleteValidation,
  checkAuth,
  authError,
  CommentController.deleteComment
);

route.get('/api/tags', PostController.getTags);

route.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

export default route;
