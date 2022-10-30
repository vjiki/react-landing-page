/* eslint-disable no-underscore-dangle */
import React from 'react';

import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchTags, fetchPosts } from '../../redux/slices/posts';
import { CommentsBlock } from './CommentsBlock';
import { Post } from './Post/Post';
import { TagsBlock } from './TagsBlock';

export const Home = () => {
  // const dispatch = useDispatch();
  // const userData = useSelector((state) => state.auth.data);
  // const { posts, tags } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.data);
  const { posts, tags } = useAppSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
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
          <Grid xs={8} item>
            {(isPostsLoading ? [...Array(5)] : posts.items).map(
              (obj: any, index: any) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                )
            )}
          </Grid>
          <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Это тестовый комментарий',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
