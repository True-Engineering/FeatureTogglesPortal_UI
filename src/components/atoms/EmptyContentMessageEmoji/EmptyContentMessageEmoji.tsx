import React, { FC } from 'react';
import { useFeatureTogglesTheme } from '../../../hooks';
import {
  styles,
  EmptyContentMessageEmojiStyles,
} from './EmptyContentMessageEmoji.styles';

export interface IEmptyContentMessageEmojiProps {
  text: string;
  width?: number;
  tweakStyles?: EmptyContentMessageEmojiStyles;
}

const EmptyContentMessageEmoji: FC<IEmptyContentMessageEmojiProps> = ({
  text,
  tweakStyles,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'EmptyContentMessageEmoji',
    styles,
    tweakStyles,
  );

  return (
    <div className={classes.empty}>
      <div className={classes.eyes}>&#128064;{/* eyes emoji */}</div>
      {text}
    </div>
  );
};

export default EmptyContentMessageEmoji;
