import React from 'react';

import IMG from '../../../public/noavatar.png';
import styles from './UserInfo.module.scss';

interface UserInfoTypes {
  avatarUrl?: string;
  fullName?: string;
  additionalText?: string;
}

export const UserInfo = ({
  avatarUrl,
  fullName,
  additionalText,
}: UserInfoTypes) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || IMG} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
