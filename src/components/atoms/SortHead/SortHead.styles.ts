import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 14,
    opacity: 0.8,

    '&:hover': {
      opacity: 1,
    },
  },

  activeIcon: {},

  activeText: {},

  icon: {
    width: 20,
    marginRight: 2,
  },
};

export type SortHeadStyles = ComponentStyles<typeof styles>;
