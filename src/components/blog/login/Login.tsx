/* eslint-disable consistent-return */
import React from 'react';

// import { Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAuth, selectIsAuth } from '../../../redux/slices/auth';
import styles from './Login.module.scss';

const Login = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('not possible to authorize');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    // return <Navigate to="/" />;
    // todo
    // router.push('/blog');
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Specify email' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Specify password' })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
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

export default Login;
