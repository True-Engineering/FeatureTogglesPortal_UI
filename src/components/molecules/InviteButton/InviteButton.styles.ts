import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    position: 'relative',
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },

  tooltip: {
    position: 'absolute',
    top: -4,
    left: '50%',
    transform: 'translate(-50%, -100%)',
  },
};

export const buttonTweakStyles = {
  s: {
    height: 40,
  },

  children: {
    display: 'flex',
    alignItems: 'center',
  },
};

export type InviteButtonStyles = ComponentStyles<typeof styles>;
