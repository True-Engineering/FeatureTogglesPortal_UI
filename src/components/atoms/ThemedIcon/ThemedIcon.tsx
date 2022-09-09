import React, { FC, useContext } from 'react';
import { FeatureTogglesThemeContext } from '../../../hooks';
import { FeatureTogglesThemedAssets } from '../../../types';

interface IThemedIcon {
  type: FeatureTogglesThemedAssets;
}

const ThemedIcon: FC<IThemedIcon> = ({ type }) => {
  const { theme } = useContext(FeatureTogglesThemeContext);
  if (theme === undefined) {
    throw new Error('no feature toggles context theme');
  }

  const { assets } = theme;
  const Icon = assets[type];
  return Icon === undefined ? null : <Icon />;
};

export default ThemedIcon;
