import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import axios from '../axios';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { CommentType, PostType } from '../@types/appTypes';
import { PostSkeleton } from '../components/Post/Skeleton';

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = useState<PostType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<CommentType[] | null>(null);

  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);

        axios
          .get(`/api/comment/${id}`)
          .then((e) => {
            setComment(e.data);
          })
          .catch((e) => console.log(e));
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
      <CommentsBlock items={comment} isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
