import express from 'express';

import * as PostController from '../controller/post-controller.js';
import * as PostValidations from '../validations/post.js';
import checkToken from '../utils/checkAuth.js';

const route = express.Router();

route.get('/api/posts', checkToken, PostController.getAllPosts);
route.get('/api/posts/:id', checkToken, PostController.getPost);
route.post(
  '/api/posts',
  PostValidations.postCreateValidation,
  checkToken,
  PostController.createPost,
);
route.put('/api/posts/:id', checkToken, PostController.updatePost);
route.delete('/api/posts/:id', checkToken, PostController.deletePost);

export default route;
