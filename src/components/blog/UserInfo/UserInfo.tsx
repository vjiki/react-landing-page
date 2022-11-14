import React from 'react';

import styles from './UserInfo.module.scss';

type UserInfoProps = {
  avatarUrl: any,
  name: any,
  additionalText: any,
};

export const UserInfo = ({
  avatarUrl,
  name,
  additionalText,
}: UserInfoProps) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || '/noavatar.png'}
        alt={name}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
