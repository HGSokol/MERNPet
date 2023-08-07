import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import axios from '../../axios';
import { PostType } from '../../@types/appTypes';
import { Post } from '../../components';
import { RootState } from '../../redux/store';

export const Tag = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const [tags, setTags] = useState<PostType[] | null>(null);
  const params = useParams();

  useEffect(() => {
    axios
      .post('/api/posts/inc', { tag: params.id })
      .then((e) => {
        console.log(e.data);
        setTags(e.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <span>{`#${params.id}`}</span>
      <div>
        {tags?.map((post, i) => {
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
            />
          );
        })}
      </div>
    </>
  );
};
