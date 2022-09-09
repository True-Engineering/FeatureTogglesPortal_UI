import React from 'react';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './CssBaseline.styles';

export const CssBaseline: React.FC = () => {
  const { classes } = useFeatureTogglesTheme('CssBaseline', styles, {});

  return <div className={classes.root} />;
};

export default CssBaseline;
