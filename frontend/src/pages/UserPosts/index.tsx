import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import axios from '../../axios';
import { PostType } from '../../@types/appTypes';
import { Post } from '../../components';
import { RootState } from '../../redux/store';

export const UserPosts = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const [posts, setPosts] = useState<PostType[] | null>(null);

  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/userPosts/${params.id}`)
      .then((e) => {
        console.log(e.data);
        setPosts(e.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <span>
        {posts && posts.length > 0 ? 'Мои статьи' : 'У вас нет статей'}
      </span>
      <div>
        {posts?.map((post, i) => {
          const {
            _id,
            title,
            imageUrl,
            author,
            createdAt,
            viewsCount,
            tags: postTags,
            comments,
          } = post;
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
              tags={postTags}
              isEditable={author?._id === data?._id}
              setPosts={setPosts}
            />
          );
        })}
      </div>
    </>
  );
};
