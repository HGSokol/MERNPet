import Post from '../model/Post.js';
import { checkAuth } from '../utils/checkAuth.js';

export const getAllPosts = (req, res) => {
  try {
  } catch (error) {}
};

export const getPost = async (req, res) => {
  try {
    await checkAuth(req, res);

    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.status(200).json(post);
    res.status(200).json('ok');
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const createPost = async (req, res) => {
  try {
    await checkAuth(req, res);

    const document = new Post({
      ...req.body,
      author: req.userId,
    });
    const post = await document.save();

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const updatePost = (req, res) => {
  try {
  } catch (error) {}
};

export const deletePost = (req, res) => {
  try {
  } catch (error) {}
};
