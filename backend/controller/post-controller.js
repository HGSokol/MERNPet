import Post from '../model/Post.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author').exec();
    if (!posts) {
      return res.status(404).json({
        message: 'У вас нет статей',
      });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    // т.к нам ужно обновлять количество просмотров, то используем не findById, а findOneAndUpdate
    Post.findOneAndUpdate({ _id: postId }, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' })
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.status(200).json(post);
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({
          message: 'Не удалось получить статью',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const createPost = async (req, res) => {
  try {
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

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    Post.findByIdAndUpdate({ _id: postId }, { ...req.body })
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.status(200).json({
          message: 'Статья успешно обновлена',
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          message: 'Не удалось обновить статью',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // проверка создатель статьи
    Post.findOne({ _id: postId })
      .then((post) => {
        if (post.author !== req.userId) {
          res.status(400).json({
            message: 'вы не автор статьи',
          });
        }
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({
          message: 'Не удалось удалить статью',
        });
      });

    // т.к нам ужно обновлять количество просмотров, то используем не findById, а findOneAndUpdate
    Post.findOneAndDelete({ _id: postId })
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.status(200).json({
          message: 'Статья успешно удалена',
        });
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({
          message: 'Не удалось удалить статью',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};
