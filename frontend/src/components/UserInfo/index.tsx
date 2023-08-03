import React from 'react';

import IMG from '../../assets/noavatar.png';
import styles from './UserInfo.module.scss';

interface UserInfoTypes {
  avatarUrl?: string;
  name?: string;
  lastname?: string;
  additionalText?: string;
}

export const UserInfo = ({
  avatarUrl,
  name,
  lastname,
  additionalText,
}: UserInfoTypes) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || IMG}
        alt={`${name} ${lastname}`}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{`${name} ${lastname}`}</span>
        <span className={styles.additional}>
          {additionalText?.slice(0, 10)}
        </span>
      </div>
    </div>
  );
};
