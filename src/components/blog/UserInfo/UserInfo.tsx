import React from 'react';

import styles from './UserInfo.module.scss';

type UserInfoProps = {
  avatarUrl: any,
  fullName: any,
  additionalText: any,
};

export const UserInfo = ({
  avatarUrl,
  fullName,
  additionalText,
}: UserInfoProps) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || '/noavatar.png'}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
