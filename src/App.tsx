/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useReducer, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { AddPost } from './components/blog/AddPost/AddPost';
import AroundBlock from './components/blog/AroundBlock';
import { EditPost } from './components/blog/EditPost/EditPost';
import { FullPost } from './components/blog/FullPost';
import LoadingComponent from './components/blog/LoadingComponent';
import MLoginPage from './components/blog/MainLogin';
import { FAQ } from './components/faq/FAQ';
import Contacts from './components/trainings/Contacts';
import logging from './config/logging';
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from './contexts/user';
import { Validate } from './modules/Auth';
import Blog from './pages/blog/blog';
import MBlogPage from './pages/blog/mblog';
import MEditPage from './pages/blog/medit';
import MHomePage from './pages/blog/mhome';
import Home from './pages/home';
import { useAppDispatch } from './redux/hooks';
import { fetchAuthMe } from './redux/slices/auth';

function App() {
  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [authStage, setAuthStage] = useState<string>(
    'Checking localstorage ...'
  );
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    dispatch(fetchAuthMe());

    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage('Checking credentials ...');

    const fire_token = localStorage.getItem('fire_token');

    if (fire_token === null) {
      userDispatch({ type: 'logout', payload: initialUserState });
      setAuthStage('No credentials found');
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          userDispatch({ type: 'logout', payload: initialUserState });
          setLoading(false);
        } else if (user) {
          userDispatch({ type: 'login', payload: { user, fire_token } });
          setLoading(false);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <LoadingComponent>{authStage}</LoadingComponent>;
  }

  return (
    <UserContextProvider value={userContextValues}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blog"
          element={
            <AroundBlock>
              <Blog />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/login"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/register"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/addpost"
          element={
            <AroundBlock>
              <AddPost />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/posts/:id/edit"
          element={
            <AroundBlock>
              <AddPost />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/posts/:id"
          element={
            <AroundBlock>
              <FullPost />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/editpost"
          element={
            <AroundBlock>
              <EditPost />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog"
          element={
            <AroundBlock>
              <MHomePage />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog/login"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog/register"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog/edit"
          element={
            <AroundBlock>
              <MEditPage />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog/edit/:blogID/edit"
          element={
            <AroundBlock>
              <MEditPage />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog/blogs/:blogID"
          element={
            <AroundBlock>
              <MBlogPage />
            </AroundBlock>
          }
        />
        <Route
          path="/contacts"
          element={
            <AroundBlock>
              <Contacts />
            </AroundBlock>
          }
        />
        <Route
          path="/faq"
          element={
            <AroundBlock>
              <FAQ />
            </AroundBlock>
          }
        />
        <Route
          path="/editpost"
          element={
            <AroundBlock>
              <EditPost />
            </AroundBlock>
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
