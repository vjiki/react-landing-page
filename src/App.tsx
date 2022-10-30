import React from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Blog from './pages/blog';
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
        {/* <Route path="/posts/:id/edit" element={<AddPost />} /> */}
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/editpost" element={<EditPostPage />} />
      </Routes>
    </>
  );
}

export default App;
