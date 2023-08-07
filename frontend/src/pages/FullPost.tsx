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
      .catch(() => setError(true));
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
        commentsCount={data?.comments?.length}
        tags={data?.tags}
        isFullPost
      >
        {data?.text && <ReactMarkdown children={data?.text} />}
      </Post>
      <CommentsBlock
        setError={setError}
        setData={setData}
        items={data?.comments!}
        isLoading={false}
      >
        <Index setError={setError} setData={setData} />
      </CommentsBlock>
    </>
  );
};
