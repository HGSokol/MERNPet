import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Registration.module.scss';
import { fetchUserRegister, selectIsAuth } from '../../redux/feature/auth';
import { AppDispatch, RootState } from '../../redux/store';
import { FormRegistrationValues } from '../../@types/appTypes';

export const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) =>
    selectIsAuth(state.auth.data)
  );

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormRegistrationValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const fetchAuth = (values: FormRegistrationValues) => {
    dispatch(fetchUserRegister(values));
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(fetchAuth)}>
        <TextField
          className={styles.field}
          label="Имя"
          {...register('name', {
            required: 'Укажите Имя',
          })}
          error={Boolean(errors?.name?.message)}
          helperText={errors?.name?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Фамилия"
          {...register('lastname', {
            required: 'Укажите Фамилию',
          })}
          error={Boolean(errors?.lastname?.message)}
          helperText={errors?.lastname?.message}
          fullWidth
        />
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
          {...register('password', {
            required: 'Укажите пароль',
            minLength: 5,
          })}
          className={styles.field}
          label="Пароль"
          error={Boolean(errors?.password?.message)}
          helperText={errors?.password?.message}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
