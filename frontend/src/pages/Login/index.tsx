import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUser, selectIsAuth } from '../../redux/feature/auth';
import { FormRegistrationValues } from '../../@types/appTypes';

export const Login = () => {
  const isAuth = useSelector((state: RootState) => {
    return selectIsAuth(state.auth.data);
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<Pick<FormRegistrationValues, 'email' | 'password'>>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const fetchAuth = (
    values: Pick<FormRegistrationValues, 'email' | 'password'>
  ) => {
    dispatch(
      fetchUser({
        token,
        ...values,
      })
    );
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(fetchAuth)}>
        <TextField
          {...register('email', {
            required: 'Укажите почту',
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          })}
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
          fullWidth
        />
        <TextField
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          label="Пароль"
          error={Boolean(errors?.password?.message)}
          helperText={errors?.password?.message}
          fullWidth
        />
        <Button
          type="submit"
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
