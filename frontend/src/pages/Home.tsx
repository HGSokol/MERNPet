import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

interface PostType {
  author: {
    avatarUrl: string;
    createdAt: string;
    email: string;
    lastname: string;
    name: string;
    password: string;
    updatedAt: string;
    _id: string;
  };
  createdAt: string;
  tags: string[];
  text: string;
  title: string;
  updatedAt: string;
  imageUrl?: string;
  viewsCount: number;
  _id: string;
}

export const Home = () => {
  const [posts, setPosts] = useState<PostType[] | null>(null);

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((e) => setPosts(e.data))
      .catch((e) => console.log(e));
  }, []);

  posts?.forEach((element) => {
    console.log(element);
  });
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
          {posts &&
            posts.map(
              ({ _id, title, imageUrl, createdAt, viewsCount, tags }, i) => (
                <Post
                  key={_id}
                  id={i}
                  title={title}
                  imageUrl={imageUrl}
                  user={{
                    avatarUrl:
                      'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: 'Keff',
                  }}
                  createdAt={createdAt}
                  viewsCount={viewsCount}
                  commentsCount={3}
                  tags={tags}
                  isEditable
                />
              )
            )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={['react', 'typescript', 'заметки']}
            isLoading={false}
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
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
