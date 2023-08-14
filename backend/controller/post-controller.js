import Post from '../model/Post.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: 'author', select: '-password' })
      .populate({
        path: 'comments',
        populate: { path: 'author', select: '-password' },
      })
      .exec();
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
export const getAllPostsOrderedBy = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ viewsCount: -1 })
      .populate('author')
      .populate({ path: 'comments', populate: { path: 'author' } })
      .exec();
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
    Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      {
        returnDocument: 'after',
        populate: [
          { path: 'author', select: '-password' },
          {
            path: 'comments',
            populate: {
              path: 'author',
              select: '-password',
            },
          },
        ],
      }
    )
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
    try {
      const post = await Post.findOne({ _id: postId });

      if (post.author.toString() !== req.userId._id) {
        res.status(400).json({
          message: 'вы не автор статьи',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Не удалось удалить статью',
      });
    }

    // т.к нам ужно обновлять количество просмотров, то используем не findById, а findOneAndUpdate
    Post.findOneAndDelete({ _id: postId })
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.status(200).json({
          ...post._doc,
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

export const getTags = async (req, res) => {
  try {
    const posts = await Post.find().limit(10).exec();
    if (!posts) {
      return res.status(404).json({
        message: 'У вас нет статей',
      });
    }

    const tags = posts
      .map((e) => e.tags)
      .flat()
      .slice(0, 5);

    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};
export const getIncPosts = async (req, res) => {
  try {
    const tag = req.body.tag;

    const posts = await Post.find({ tags: tag })
      .populate({ path: 'author', select: '-password' })
      .populate({
        path: 'comments',
        populate: { path: 'author', select: '-password' },
      })
      .exec();
    if (!posts) {
      return res.status(404).json({
        message: 'Нет статей с таким тэгом',
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

export const getUserPosts = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404).json({
        message: 'ошибка получения статей',
      });
    }

    const docs = await Post.find({ author: req.params.id }).populate('author');
    if (!docs) {
      return res.status(404).json({
        message: 'Нет статей',
      });
    }

    res.status(200).json(docs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};
