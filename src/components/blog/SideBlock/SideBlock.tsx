import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import styles from './SideBlock.module.scss';

type SideBlockProps = {
  title: string,
  children?: any,
};

export const SideBlock = ({ title, children }: SideBlockProps) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
