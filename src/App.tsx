import React from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { EditPost } from './components/blog/EditPost/EditPost';
import Blog from './pages/blog';
import AddPostPage from './pages/blog/addpost';
import LoginPage from './pages/blog/login';
import FullPostPage from './pages/blog/posts/fullpost';
import RegisterPage from './pages/blog/register';
import ContactsPage from './pages/contacts';
import EditPostPage from './pages/editpost';
import FaqPage from './pages/faq';
import Home from './pages/home';
import { useAppDispatch } from './redux/hooks';
import { fetchAuthMe } from './redux/slices/auth';

function App() {
  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/login" element={<LoginPage />} />
        <Route path="/blog/register" element={<RegisterPage />} />
        <Route path="/blog/addpost" element={<AddPostPage />} />
        <Route path="/blog/posts/:id/edit" element={<AddPostPage />} />
        <Route path="/blog/posts/:id" element={<FullPostPage />} />
        <Route path="/blog/editpost" element={<EditPost />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/editpost" element={<EditPostPage />} />
      </Routes>
    </>
  );
}

export default App;
