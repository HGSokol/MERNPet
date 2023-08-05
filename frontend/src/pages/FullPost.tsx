import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import axios from '../axios';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { PostType } from '../@types/appTypes';
import { PostSkeleton } from '../components/Post/Skeleton';

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = useState<PostType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((e) => setError(true));
  }, []);

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (error) {
    return <h3>Не удалось загрузить статью...</h3>;
  }

  return (
    <>
      <Post
        id={id}
        title={data?.title}
        imageUrl={data?.imageUrl}
        user={data?.author}
        createdAt={data?.createdAt}
        viewsCount={data?.viewsCount}
        commentsCount={3}
        tags={data?.tags}
        isFullPost
      >
        {data?.text && <ReactMarkdown children={data?.text} />}
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
