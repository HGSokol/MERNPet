import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SideBlock } from './SideBlock';
import { CommentBlockType } from '../@types/appTypes';
import { RootState } from '../redux/store';
import axios from '../axios';

export const CommentsBlock = ({
  setError,
  setData,
  items,
  children,
  isLoading = true,
}: CommentBlockType) => {
  const params = useParams();
  const { _id: userId } = useSelector((state: RootState) => state.auth.data!);

  const onClickRemove = (id: string) => {
    const data = {
      idPost: params.id,
      idComment: id,
    };

    axios
      .delete('/api/comment', { data })
      .then((e) => {
        axios
          .get(`/api/posts/${params.id}`)
          .then(({ data }) => {
            setData(data);
          })
          .catch(() => setError(true));
      })
      .catch((e) => console.log(e));
  };

  return (
    <SideBlock title="Комментарии">
      <List>
        {isLoading
          ? null
          : items?.map((obj, index) => {
              const { _id: commentId, createdAt } = obj;
              const { _id: authorId, name, lastname, avatarUrl } = obj.author;

              const date = new Date(createdAt);
              return (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {isLoading ? (
                        <Skeleton variant="circular" width={40} height={40} />
                      ) : (
                        <Avatar alt={`${name} ${lastname}`} src={avatarUrl} />
                      )}
                    </ListItemAvatar>
                    {isLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Skeleton variant="text" height={25} width={120} />
                        <Skeleton variant="text" height={18} width={230} />
                      </div>
                    ) : (
                      <>
                        <ListItemText
                          primary={`${name} ${lastname}  ${date.toLocaleDateString()} - ${date.toLocaleTimeString()} `}
                          secondary={obj.text}
                        />
                        {authorId === userId && (
                          <IconButton
                            onClick={() => onClickRemove(commentId)}
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </>
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            })}
      </List>
      {children}
    </SideBlock>
  );
};
