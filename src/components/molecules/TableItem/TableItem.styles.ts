import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {},

  rowWithAction: {
    cursor: 'pointer',
  },

  activeRow: {
    cursor: 'default',
  },

  flagStateCell: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 24,
  },

  sprintCell: {
    display: 'flex',
    gap: 8,
  },

  nameCell: {
    display: 'flex',
  },

  arrow: {
    display: 'inline-block',
    width: 20,
    height: 20,
    transition: 'transform .2s ease',
    flexShrink: 0,
    margin: [-2, 0],
  },

  open: {
    transform: 'rotate(90deg)',
  },

  expandedRow: {
    '& td': {
      padding: 0,
      boxSizing: 'border-box',
    },
    borderBottom: 'none !important',
  },

  expandedRowData: {
    display: 'flex',
    padding: [20, 92],
    justifyContent: 'center',
  },

  actionButton: {
    margin: [-8, 0, -8, 'auto'],
    opacity: 0,
    transition: '0.25s ease-in-out',
    transitionProperty: 'opacity',

    '$root:hover &': {
      opacity: 1,
    },
  },
};

export type TableItemStyles = ComponentStyles<typeof styles>;
