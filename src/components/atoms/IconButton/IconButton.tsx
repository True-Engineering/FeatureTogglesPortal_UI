import React, { FC } from 'react';
import { Styles } from 'react-jss';
import clsx from 'clsx';
import { Icon, IIconType } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import {
  styles,
  copyOutlineIconTweakStyles,
  trashIconTweakStyles, // closeIconTweakStyles,
  defaultIconTweakStyles,
} from './IconButton.styles';

export interface IIconButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'disabled' | 'style'> {
  icon: IIconType;
  view?: 'cancel' | 'cancel-light' | 'main';
  type?: 'submit' | 'button';
  isDisabled?: boolean;
  isActive?: boolean;
  tweakStyles?: Styles;
  testId?: string;
  iconTweakStyles?: Styles<string>;
}

const defaultTweakStyles: { [k in IIconType]?: Styles<string> } = {
  'copy-outline': copyOutlineIconTweakStyles,
  'trash-can': trashIconTweakStyles,
  // TODO !!!
  // close: closeIconTweakStyles,
};

const IconButton: FC<IIconButtonProps> = ({
  icon,
  type = 'button',
  view = 'cancel-light',
  isDisabled = false,
  isActive = false,
  onClick,
  testId,
  tweakStyles,
  iconTweakStyles,
  ...buttonProps
}) => {
  const { classes } = useFeatureTogglesTheme('IconButton', styles, tweakStyles);

  return (
    <button
      className={clsx(classes.root, classes[view], isActive && classes.active)}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      type={type}
      data-testid={testId}
      {...buttonProps}
    >
      <Icon
        type={icon}
        tweakStyles={
          iconTweakStyles ?? defaultTweakStyles[icon] ?? defaultIconTweakStyles
        }
      />
    </button>
  );
};

export default IconButton;
