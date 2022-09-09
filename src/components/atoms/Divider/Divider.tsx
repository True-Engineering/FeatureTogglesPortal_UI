import React, { FC } from 'react';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './Divider.styles';

const Divider: FC = () => {
  const { classes } = useFeatureTogglesTheme('Divider', styles, {});

  return <div className={classes.root}></div>;
};

export default Divider;
