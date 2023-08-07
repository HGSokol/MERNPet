import mongoose from 'mongoose';

import Comment from '../model/Comment.js';
import Post from '../model/Post.js';

export const createComment = async (req, res) => {
  try {
    const { idPost, text } = req.body;

    const doc = new Comment({
      author: req.userId._id,
      text: text,
      post: idPost,
    });

    const { _id } = await doc.save();

    Post.findByIdAndUpdate(idPost, { $push: { comments: { _id } } }).catch(
      (error) => {
        console.log(error);
        res.status(500).json({
          message: 'Не удалось создать комментарий',
        });
      }
    );

    res.status(200).json({
      message: 'комментарий успешно создан',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать комментарий',
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const posts = await Comment.find({ post: req.params.id })
      .populate('author')
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};
