import React, { useState } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import styles from './Post.module.scss';
import IMG from '../../assets/noavatar.png';
import { UserInfo } from '../UserInfo';
import { fetchRemovePost } from '../../redux/feature/posts';
import { AppDispatch } from '../../redux/store';

interface PostTypes {
  id?: number | string;
  title?: string;
  createdAt?: string;
  imageUrl?: string;
  user?: {
    avatarUrl?: string;
    name?: string;
    lastname?: string;
  };
  viewsCount?: number;
  commentsCount?: number;
  tags?: string[];
  children?: React.ReactNode;
  isFullPost?: boolean;
  isEditable?: boolean;
}

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isEditable,
}: PostTypes) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = (value?: boolean) => {
    if (value) {
      dispatch(fetchRemovePost(id as string));
    }
    setOpen(false);
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Вы действительно хотите удалить статью?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose(true)} autoFocus>
            Да
          </Button>
          <Button onClick={() => handleClose(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => setOpen(true)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={`http://localhost:3001${imageUrl}` || IMG}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags &&
              tags.map((name) => (
                <li key={name}>
                  <Link to={`/tag/${name}`}>#{name}</Link>
                </li>
              ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
