import React, { FC } from 'react';
import { ThemedPreloader } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './GlobalPreloader.styles';

const GlobalPreloader: FC = () => {
  const { classes } = useFeatureTogglesTheme('GlobalPreloader', styles, {});

  return (
    <div className={classes.root}>
      <div className={classes.page}>
        <div style={{ width: 100 }}>
          <ThemedPreloader type="logo" />
        </div>
      </div>
    </div>
  );
};

export default GlobalPreloader;
