import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  trigger: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
  },

  activeTrigger: {},

  disabled: {
    cursor: 'not-allowed',
  },

  value: {
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: '0.15px',
  },

  arrow: {
    width: 16,
    height: 16,
    pointerEvents: 'none',
    zIndex: 1,
    transition: 'transform 0.1s ease',
  },

  activeArrow: {
    transform: 'rotate(180deg)',
  },
};

export type DropdownStyles = ComponentStyles<typeof styles>;
