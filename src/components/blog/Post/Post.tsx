/* eslint-disable no-return-assign */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';

import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../redux/hooks';
// import { useDispatch } from 'react-redux';
import { fetchRemoveBlog } from '../../../redux/slices/blogs';
import { UserInfo } from '../UserInfo/UserInfo';
import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';

type PostProps = {
  id?: any,
  title?: any,
  createdAt?: any,
  imageUrl?: any,
  author?: any,
  viewsCount?: any,
  commentsCount?: any,
  tags?: any,
  children?: any,
  isFullPost?: any,
  isLoading?: any,
  isEditable?: any,
};

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  author,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}: PostProps) => {
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove post?')) {
      dispatch(fetchRemoveBlog(id));
    }
  };

  return (
    <div className={clsx(styles.root, isFullPost ? styles.rootFull : '')}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/blog/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, isFullPost ? styles.imageFull : '')}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...author} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title)}>
            {isFullPost ? title : <Link to={`/blog/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name: any) => (
              <li key={name}>
                <Link to={`/blog/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && (
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: children.props.children }}
            />
          )}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
