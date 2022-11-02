/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useReducer, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { EditPost } from './components/blog/EditPost/EditPost';
import LoadingComponent from './components/mblog/LoadingComponent';
import logging from './config/logging';
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from './contexts/user';
import { Validate } from './modules/Auth';
import Blog from './pages/blog';
import AddPostPage from './pages/blog/addpost';
import LoginPage from './pages/blog/login';
import FullPostPage from './pages/blog/posts/fullpost';
import RegisterPage from './pages/blog/register';
import ContactsPage from './pages/contacts';
import EditPostPage from './pages/editpost';
import FaqPage from './pages/faq';
import Home from './pages/home';
import MMBlogPage from './pages/mblog/full/blog';
import MMEditPage from './pages/mblog/full/edit';
import MMHomePage from './pages/mblog/full/home';
import MMLoginPage from './pages/mblog/full/login';
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/login" element={<LoginPage />} />
        <Route path="/blog/register" element={<RegisterPage />} />
        <Route path="/blog/addpost" element={<AddPostPage />} />
        <Route path="/blog/posts/:id/edit" element={<AddPostPage />} />
        <Route path="/blog/posts/:id" element={<FullPostPage />} />
        <Route path="/blog/editpost" element={<EditPost />} />
        <Route path="/mblog" element={<MMHomePage />} />
        <Route path="/mblog/login" element={<MMLoginPage />} />
        <Route path="/mblog/register" element={<MMLoginPage />} />
        <Route path="/mblog/edit" element={<MMEditPage />} />
        <Route path="/mblog/edit/:blogID/edit" element={<MMEditPage />} />
        <Route path="/mblog/blogs/:blogID" element={<MMBlogPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/editpost" element={<EditPostPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
