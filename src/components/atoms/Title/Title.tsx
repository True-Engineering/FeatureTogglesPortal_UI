import React, { FC } from 'react';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './Title.styles';

export interface ITitleProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  right?: React.ReactNode;
}

const Title: FC<ITitleProps> = ({ title, subTitle, right }) => {
  const { classes } = useFeatureTogglesTheme('Title', styles, {});

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {title}
        {subTitle !== undefined && (
          <div className={classes.subTitle}>{subTitle}</div>
        )}
      </div>

      {right && <div className={classes.titleRight}>{right}</div>}
    </div>
  );
};

export default Title;
