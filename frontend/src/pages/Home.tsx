import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { PostSkeleton } from '../components/Post/Skeleton';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../redux/feature/posts';
import { AppDispatch, RootState } from '../redux/store';

export const Home = () => {
  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  console.log(posts, tags);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading ? (
            <PostSkeleton />
          ) : (
            posts.items.map(
              (
                { _id, title, imageUrl, createdAt, viewsCount, author, tags },
                i
              ) => {
                return (
                  <Post
                    key={i}
                    id={_id}
                    title={title}
                    imageUrl={imageUrl}
                    user={author}
                    createdAt={createdAt}
                    viewsCount={viewsCount}
                    commentsCount={3}
                    tags={tags}
                    isEditable
                  />
                );
              }
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={['react', 'typescript', 'заметки']}
            isLoading={isLoading}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Сергей Ринцевич',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Герман Соколов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
