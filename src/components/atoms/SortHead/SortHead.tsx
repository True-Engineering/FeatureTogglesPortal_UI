import React, { FC } from 'react';
import clsx from 'clsx';
import { Icon } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { ISortDirection, ISortBy } from '../../../types';
import { styles } from './SortHead.styles';

export interface ISortHeadProps {
  value: ISortBy;
  text: string;
  direction?: ISortDirection;
  isActive: boolean;
  onClick: (value: ISortBy) => void;
}

const SortHead: FC<ISortHeadProps> = ({
  value,
  text,
  direction = 'none',
  isActive = false,
  onClick,
}) => {
  const { classes } = useFeatureTogglesTheme('SortHead', styles, {});

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={clsx(classes.icon, isActive && classes.activeIcon)}>
        <Icon
          type={
            direction === 'asc'
              ? 'sort-list-asc'
              : direction === 'desc'
              ? 'sort-list-desc'
              : 'sort'
          }
        />
      </div>
      <div className={clsx(isActive && classes.activeText)}>{text}</div>
    </div>
  );
};

export default SortHead;
