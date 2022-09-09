import React, { FC } from 'react';
import { Icon } from '@true-engineering/true-react-common-ui-kit';

export const YellowStarIcon: FC = () => {
  const gradientId = 'paint0_linear_0_12744';
  return (
    <>
      <Icon
        type="star"
        tweakStyles={{
          root: {
            '& path': {
              fill: `url(#${gradientId})`,
              stroke: `url(#${gradientId})`,
            },
          },
        }}
      />
      <YellowGradient gradientId={gradientId} />
    </>
  );
};

interface IYellowGradientProps {
  gradientId: string;
}

export const YellowGradient: FC<IYellowGradientProps> = ({ gradientId }) => (
  <svg width="0" height="0">
    <defs>
      <linearGradient id={gradientId}>
        <stop offset="0%" stopColor="#FEE925" />
        <stop offset="100%" stopColor="#F0A31B" />
      </linearGradient>
    </defs>
  </svg>
);

export default YellowStarIcon;
