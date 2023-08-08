import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './Header.module.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { logout, selectIsAuth } from '../../redux/feature/auth';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) =>
    selectIsAuth(state.auth.data)
  );

  const handleClose = (value?: boolean) => {
    if (value) {
      dispatch(logout());
      localStorage.removeItem('token');
      navigate('/');
    }
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Вы уверены что хотите выйти?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose(true)} autoFocus>
            Выйти
          </Button>
          <Button onClick={() => handleClose(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={() => setOpen(true)}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
