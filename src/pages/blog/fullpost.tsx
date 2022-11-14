/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ReactMarkdown from "react-markdown";
import { Navigate, useParams, useNavigate } from "react-router-dom";

import ErrorText from '../../components/blog/ErrorText';
import { Post } from '../../components/blog/Post/Post';
import config from '../../config/config';

type PostProps = {
  _id?: any,
  title?: any,
  content?: any,
  createdAt?: any,
  imageUrl?: any,
  author?: any,
  viewsCount?: any,
  commentsCount?: any,
  tags?: any,
  isFullPost?: any,
};

const FullPost: React.FunctionComponent<any> = () => {
  const [postId, setPostId] = useState<string>('');
  const { id } = useParams();
  const [data, setData] = useState<PostProps>();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const newPostId = id;

    if (newPostId) 
    {
      setPostId(newPostId);
    }
    else
    {
        navigate('/blog');
    }
}, []);

const getPost = async () => {
  try 
  {
      const response = await await axios({
        method: 'GET',
        url: `${config.server.url}/blogs/read/${postId}`,
    });

      if (response.status === (200 || 304))
      { 
          setData(response.data.blog);
          setLoading(false);
      }
      else
      {
          setError(`Unable to retrieve blog ${postId}`);
      }
  } 
  catch (err: any) 
  {
      setError(err.message);
      //     alert('Failed to get post');
  }
  finally
  {
      setTimeout(() => {
      }, 500);
  }
}


  useEffect(() => {
    if (postId !== '')
    getPost();
    }, [postId]);



  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  if (data) {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            // ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
            ? `${config.server.url}${data.imageUrl}`
            : ''
        }
        author={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.content} />
      </Post>
      <ErrorText error={error} />
      </div>
    </>
  );
}

  return <Navigate replace to='/blog' />;
};

export default FullPost;