import React, { ReactNode } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { CommentsBlockTypes, CommentType } from '../@types/appTypes';

interface CommentBlockType {
  items: CommentType[] | null;
  children: React.ReactNode;
  isLoading: Boolean;
}

export const CommentsBlock = ({
  items,
  children,
  isLoading = true,
}: CommentBlockType) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {isLoading
          ? null
          : items?.map((obj, index) => {
              const { name, lastname, avatarUrl } = obj.author;

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
                      <ListItemText
                        primary={`${name} ${lastname}`}
                        secondary={obj.text}
                      />
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
