import React from 'react';

import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout, selectIsAuth } from '../../../redux/slices/auth';
import styles from './BlogHeader.module.scss';

export const BlogHeader = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className="max-w-5xl">
      {/* <div className={`flex sm:flex-row`}> */}
      <div className="relative flex items-center mt-10 justify-between sm:h-10 lg:justify-end sm:justify-end sm:right-10">
        <div className={styles.root}>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/blog/addpost">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/blog/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/blog/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
