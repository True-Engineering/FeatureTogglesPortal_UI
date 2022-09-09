import React, { forwardRef } from 'react';
import { useFeatureTogglesTheme } from '../../../../hooks';
import {
  styles,
  ListForInfiniteScrollStyles,
} from '../ListForInfiniteScroll.styles';

export interface IListForInfiniteScrollItemProps {
  tweakStyles?: ListForInfiniteScrollStyles;
  children: React.ReactNode;
}

const ListForInfiniteScrollItem = forwardRef<
  HTMLLIElement,
  IListForInfiniteScrollItemProps
>(({ tweakStyles, children }, ref) => {
  const { classes } = useFeatureTogglesTheme(
    'ListForInfiniteScroll',
    styles,
    tweakStyles,
  );

  return (
    <li className={classes.listItem} ref={ref}>
      {children}
    </li>
  );
});

export default ListForInfiniteScrollItem;
