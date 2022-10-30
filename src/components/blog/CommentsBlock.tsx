import React from 'react';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock/SideBlock';

type CommentsBlockProps = {
  items: any,
  children?: any,
  isLoading: boolean,
};

export const CommentsBlock = ({
  items,
  children,
  isLoading = true,
}: CommentsBlockProps) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map(
          (
            obj: {
              user: {
                fullName: {} | null | undefined,
                avatarUrl: string | undefined,
              },
              text:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined,
            },
            index: React.Key | null | undefined
          ) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    // alt={obj.user.fullName}
                    <Avatar src={obj.user.avatarUrl} />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )
        )}
      </List>
      {children}
    </SideBlock>
  );
};
