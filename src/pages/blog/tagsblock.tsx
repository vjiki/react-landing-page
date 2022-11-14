/* eslint-disable react/jsx-key */
import React from 'react';

import TagIcon from '@mui/icons-material/Tag';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from '../../components/blog/SideBlock/SideBlock';

type TagsBlockProps = {
  items: any,
  isLoading: any,
};

export const TagsBlock = ({ items, isLoading = true }: TagsBlockProps) => {
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name: any, i: any) => (
          <a
            style={{ textDecoration: 'none', color: 'black' }}
            href={`/tags/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
