import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUser } from '../../redux/feature/auth';
import { FormLoginValues } from '../../@types/appTypes';

export const Login = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormLoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const fetchAuth = (values: FormLoginValues) => {
    dispatch(
      fetchUser({
        token,
        ...values,
      })
    );
    navigate('/');
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
