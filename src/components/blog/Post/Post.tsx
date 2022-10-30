/* eslint-disable no-return-assign */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';

import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
// import Link from 'next/link';

// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { useAppDispatch } from '../../../redux/hooks';

import { useAppDispatch } from '../../../redux/hooks';
import { fetchRemovePost } from '../../../redux/slices/posts';
import { UserInfo } from '../UserInfo/UserInfo';
import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';

type PostProps = {
  id?: any,
  title?: any,
  createdAt?: any,
  imageUrl?: any,
  user?: any,
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
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}: PostProps) => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove post?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    // { [styles.rootFull]: isFullPost })}>
    <div className={clsx(styles.root, isFullPost ? styles.rootFull : '')}>
      {isEditable && (
        <div className={styles.editButtons}>
          {/* <Link href={`/blog/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link> */}
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          // className={clsx(styles.image)}
          className={clsx(styles.image, isFullPost ? styles.imageFull : '')}
          src={imageUrl}
          alt={title}
        />
      )}
      {/* {imageUrl && !isFullPost && (
        <img
          // className={clsx(styles.image)}
          className={clsx(styles.image, styles.imageFull)}
          src={imageUrl}
          alt={title}
        />
      )} */}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title)}>
            {isFullPost
              ? title
              : // <Link href={`/blog/posts/${id}`}>{title}</Link>
                title}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name: any) => (
              <li key={name}>
                {/* todo */}
                {/* <Link href={`/tag/${name}`}>#{name}</Link> */}
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
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
