/* eslint-disable react/no-children-prop */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
import React from 'react';

// import { useRouter } from 'next/router';
import ReactMarkdown from "react-markdown";

import axios from '../../axios';
import { Index } from './AddComment/Index';
import { CommentsBlock } from './CommentsBlock';
import { Post } from './Post/Post';

type PostProps = {
  _id?: any,
  title?: any,
  text?: any,
  createdAt?: any,
  imageUrl?: any,
  user?: any,
  viewsCount?: any,
  commentsCount?: any,
  tags?: any,
  isFullPost?: any,
};

export const FullPost = () => {
  // const [isLoading] = React.useState(true);
  // const router = useRouter();
  // const { id } = router.query;

  const [data, setData] = React.useState<PostProps>();
  const [isLoading, setLoading] = React.useState(true);
  // const { id } = useParams();

  React.useEffect(() => {
    // if(!router.isReady) return;

    // console.log(id);
    axios
      .get(`/posts/`) // ${id}
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Failed to get post');
      });
    }, []);

  // }, [router.isReady]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  if(data === undefined) {
    return <></>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            // ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
            ? `http://localhost:4444${data.imageUrl}`
            : ''
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
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
      >
        <Index />
      </CommentsBlock>
      </div>
    </>
  );
};
