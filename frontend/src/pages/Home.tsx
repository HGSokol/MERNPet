import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { PostSkeleton } from '../components/Post/Skeleton';
import {
  fetchPosts,
  fetchPostsOrderedBy,
  fetchTags,
} from '../redux/feature/posts';
import { AppDispatch, RootState } from '../redux/store';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [tabsValue, setTabsValue] = useState(0);
  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const { data } = useSelector((state: RootState) => state.auth);

  const isLoadingPosts = posts.status === 'loading';
  const isLoadingTags = posts.status === 'loading';

  useEffect(() => {
    tabsValue === 0 ? dispatch(fetchPosts()) : dispatch(fetchPostsOrderedBy());
    dispatch(fetchTags());
  }, [tabsValue]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabsValue}
        aria-label="basic tabs example"
      >
        <Tab onClick={() => setTabsValue(0)} label="Новые" />
        <Tab onClick={() => setTabsValue(1)} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoadingPosts ? (
            <PostSkeleton />
          ) : (
            posts.items.map(
              (
                {
                  _id,
                  title,
                  imageUrl,
                  createdAt,
                  viewsCount,
                  author,
                  tags,
                  comments,
                },
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
                    commentsCount={comments?.length}
                    tags={tags}
                    isEditable={author?._id === data?._id}
                  />
                );
              }
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isLoadingTags} />
          {/* <CommentsBlock
            items={
						// 	[
            //   {
            //     user: {
            //       fullName: 'Сергей Ринцевич',
            //       avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            //     },
            //     text: 'Это тестовый комментарий',
            //   },
            //   {
            //     user: {
            //       fullName: 'Герман Соколов',
            //       avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            //     },
            //     text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
            //   },
            // ]
					}
            isLoading={isLoadingPosts}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
