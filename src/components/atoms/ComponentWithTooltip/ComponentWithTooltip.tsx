import React, { FC, useState } from 'react';
import clsx from 'clsx';
import {
  Tooltip,
  ITooltipProps,
} from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './ComponentWithTooltip.styles';

export interface IComponentWithTooltipProps {
  tooltipProps: ITooltipProps;
  tooltipPosition?:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'right'
    | 'left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left';
  children: React.ReactNode;
  shouldShowTooltip?: boolean;
}

export const ComponentWithTooltip: FC<IComponentWithTooltipProps> = ({
  tooltipProps,
  tooltipPosition = 'top',
  children,
  shouldShowTooltip = false,
}) => {
  const [isTooltipShown, setTooltipShown] = useState(false);

  const { classes } = useFeatureTogglesTheme('ComponentWithTooltip', styles);

  const handleTooltipShow = shouldShowTooltip
    ? () => setTooltipShown(true)
    : undefined;
  const handleTooltipHide = shouldShowTooltip
    ? () => setTooltipShown(false)
    : undefined;

  return (
    <div
      className={classes.root}
      onMouseEnter={handleTooltipShow}
      onMouseLeave={handleTooltipHide}
    >
      {isTooltipShown && shouldShowTooltip && (
        <div className={clsx(classes.tooltip, classes[tooltipPosition])}>
          <Tooltip {...tooltipProps} />
        </div>
      )}
      {children}
    </div>
  );
};

export default ComponentWithTooltip;
