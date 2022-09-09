import React, { FC } from 'react';
import { ThemedIcon } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './EmptyContentMessage.styles';

export interface IEmptyContentMessageProps {
  text: string;
}

const EmptyContentMessage: FC<IEmptyContentMessageProps> = ({ text }) => {
  const { classes } = useFeatureTogglesTheme('EmptyContentMessage', styles, {});

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ThemedIcon type="denied" />
        <div className={classes.text}>{text}</div>
      </div>
    </div>
  );
};

export default EmptyContentMessage;
