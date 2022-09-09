import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  groupRowHeader: {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderTop: 'none',
  },

  headerText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    gap: 4,
  },

  arrow: {
    width: 20,
    height: 20,
    transition: 'transform .2s ease',
    flexShrink: 0,
    margin: [-4, 0],
  },

  open: {
    transform: 'rotate(90deg)',
  },

  groupName: {
    paddingLeft: 6,
  },
};

export type GroupRowStyles = ComponentStyles<typeof styles>;
