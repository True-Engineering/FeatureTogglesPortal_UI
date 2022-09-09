import React, { FC } from 'react';
import { Styles } from 'react-jss';
import clsx from 'clsx';
import {
  Icon,
  IIconType,
  ThemedPreloader,
  ThemedPreloaderStyles,
} from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles, smallPreloaderStyles } from './LinkButton.styles';

export interface ILinkButtonProps {
  text?: string;
  icon?: IIconType;
  type?: 'submit' | 'button';
  view?: 'main' | 'cancel';
  isBold?: boolean;
  hasCircleUnderIcon?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  title?: string;
  testId?: string;
  tweakStyles?: Styles;
  size?: 'small' | 'normal';
  iconPosition?: 'left' | 'right';
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void | Promise<void>;
}

export const LinkButton: FC<ILinkButtonProps> = ({
  text,
  icon,
  view = 'main',
  onClick,
  isDisabled,
  isBold = false,
  isLoading = false,
  isActive = false,
  hasCircleUnderIcon = false,
  type = 'button',
  size = 'normal',
  iconPosition = 'left',
  title,
  testId,
  tweakStyles,
}) => {
  const { classes } = useFeatureTogglesTheme('LinkButton', styles, tweakStyles);

  return (
    <button
      type={type}
      className={clsx(
        classes.root,
        classes[size],
        classes[view],
        isBold && classes.bold,
        isLoading && classes.loading,
        isActive && classes.active,
      )}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled || isLoading}
      title={title}
      data-testid={testId}
    >
      <span
        className={clsx(
          classes.content,
          iconPosition === 'right' && classes.reverseContent,
        )}
      >
        {icon !== undefined && (
          <span
            className={clsx(
              classes.iconContainer,
              hasCircleUnderIcon && classes.circle,
            )}
          >
            <div className={classes.icon}>
              <Icon type={icon} />
            </div>
          </span>
        )}
        {text !== undefined && <span className={classes.text}>{text}</span>}
      </span>

      {isLoading && (
        <span className={classes.loader}>
          <ThemedPreloader
            type="dots"
            tweakStyles={smallPreloaderStyles as ThemedPreloaderStyles}
          />
        </span>
      )}
    </button>
  );
};

export default LinkButton;
