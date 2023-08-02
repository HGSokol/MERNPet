import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import styles from './SideBlock.module.scss';

interface SideBlockTypes {
  title: string;
  children: ReactNode;
}

export const SideBlock = ({ title, children }: SideBlockTypes) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
