import React, { FC } from 'react';
import { useFeatureTogglesTheme } from '../../../hooks';
import {
  styles,
  ListForInfiniteScrollStyles,
} from './ListForInfiniteScroll.styles';

export interface IListForInfiniteScrollProps {
  tweakStyles?: ListForInfiniteScrollStyles;
  children: React.ReactNode;
}

const ListForInfiniteScroll: FC<IListForInfiniteScrollProps> = ({
  tweakStyles,
  children,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'ListForInfiniteScroll',
    styles,
    tweakStyles,
  );

  return <ul className={classes.list}>{children}</ul>;
};

export default ListForInfiniteScroll;
