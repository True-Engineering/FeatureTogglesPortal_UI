import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './DeniedMessage.styles';
import { ThemedIcon } from '../ThemedIcon';

export interface IDeniedMessageProps {
  message?: string;
}

const DeniedMessage: FC<IDeniedMessageProps> = ({ message }) => {
  const { classes } = useFeatureTogglesTheme('DeniedMessage', styles, {});
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <ThemedIcon type="denied" />
      <div className={classes.text}>{message ?? t('noPermission')}</div>
    </div>
  );
};

export default DeniedMessage;
