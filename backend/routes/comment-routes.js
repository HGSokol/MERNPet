import express from 'express';

import { CommentController } from '../controller/index.js';
import * as CommentValidation from '../validations/comment.js';
import { checkAuth, authError } from '../utils/index.js';

const route = express.Router();

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

export default route;
