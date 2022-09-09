import React, { FC } from 'react';
import clsx from 'clsx';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles, TextWithStatusStyles } from './TextWithStatus.styles';

export interface ITextWithStatusProps {
  text?: string;
  size?: 'xs' | 's' | 'm';
  color: 'green' | 'grey' | 'orange' | 'red' | 'blue';
  tweakStyles?: TextWithStatusStyles;
}

const TextWithStatus: FC<ITextWithStatusProps> = ({
  text,
  color,
  size = 's',
  tweakStyles,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'TextWithStatus',
    styles,
    tweakStyles,
  );

  return (
    <span className={clsx(classes.root, classes[size], classes[color])}>
      {text}
    </span>
  );
};

export default TextWithStatus;
