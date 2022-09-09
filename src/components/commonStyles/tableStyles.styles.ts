import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  table: {
    width: '100%',
    backgroundColor: colors.CLASSIC_WHITE,
  },

  shadow: {
    borderRadius: 12,
  },

  disabledBorders: {
    '& > $headRow, & > $row, & > $footerRow, & > $cell': {
      border: 0,
    },
  },

  headRow: {
    display: 'flex',
  },

  row: {
    display: 'flex',
  },

  headCell: {
    display: 'flex',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',

    padding: [16, 24],
    fontSize: 12,
    fontWeight: 'normal',
  },

  cell: {
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',

    padding: [12, 24],
    fontSize: 16,
  },

  compact: {
    '& $headCell': {
      padding: [10, 16],
      fontSize: 12,
    },

    '& $cell': {
      padding: [8, 16],
      fontSize: 14,
    },
  },

  actionButton: {
    opacity: 0,
    transition: '0.25s ease-in-out',
    transitionProperty: 'opacity',

    '$row:hover &': {
      opacity: 1,
    },
  },

  footerRow: {
    display: 'flex',
  },
};

export type TableStyles = ComponentStyles<typeof styles>;
