/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext } from 'react';

import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { Post } from '../../components/blog/Post/Post';
import config from '../../config/config';
import UserContext from '../../contexts/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBlogs } from '../../redux/slices/blogs';

const Blog: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  // const userData = useAppSelector((state) => state.auth.data);
  const { blogs } = useAppSelector((state) => state.blogs);
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const isPostsLoading = blogs.status === 'loading';

  useEffect(() => {
    dispatch(fetchBlogs());
    // blogs.sort((x,y) => y.updatedAt.localeCompare(x.updatedAt));
  }, []);

  const shownBlogs = isPostsLoading
    ? [...Array(5)].map((obj, index) => <Post key={index} isLoading={true} />)
    : blogs.items.blogs.map((obj, index) => (
        <Post
          key={index}
          id={obj._id}
          title={obj.title}
          // author={(blog.author as IUser).name}
          // headline={blog.headline}
          // updatedAt={blog.updatedAt}
          imageUrl={obj.imageUrl ? `${config.server.url}${obj.imageUrl}` : ''}
          author={obj.author}
          createdAt={obj.createdAt}
          viewsCount={obj.viewsCount}
          commentsCount={3}
          tags={obj.tags}
          isEditable={user._id === obj.author._id}
        />
      ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={16} item>
          {shownBlogs}
        </Grid>
      </Grid>
    </div>
  );
};

export default Blog;
