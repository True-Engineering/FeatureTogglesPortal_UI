import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles, avatarColors } from './AccountAvatar.styles';

export interface IAccountAvatarProps {
  name: string;
  avatarUrl?: string;
}

type IAvatarColor = typeof avatarColors[number];

const AccountAvatar: FC<IAccountAvatarProps> = ({ name, avatarUrl }) => {
  const { classes } = useFeatureTogglesTheme('AccountAvatar', styles, {});

  const [isError, setError] = useState(false);

  return avatarUrl !== undefined && !isError ? (
    <img
      src={avatarUrl}
      className={classes.imageAvatar}
      onError={() => setError(true)}
      alt="user-avatar"
    />
  ) : (
    <div
      className={clsx(classes.wordAvatar, classes[getRandomAvatarColor(name)])}
    >
      {getAbbreviation(name)}
    </div>
  );
};

const getAbbreviation = (name: string): string => {
  const [firstWord, secondWord] = name.split(' ');
  return [firstWord[0], secondWord === undefined ? firstWord[1] : secondWord[0]]
    .join('')
    .toUpperCase();
};

const getRandomAvatarColor = (name: string): IAvatarColor => {
  const sum = [...name].reduce((s, l) => s + l.charCodeAt(0), 0);
  const index = sum % avatarColors.length;
  return avatarColors[index];
};

export default AccountAvatar;
