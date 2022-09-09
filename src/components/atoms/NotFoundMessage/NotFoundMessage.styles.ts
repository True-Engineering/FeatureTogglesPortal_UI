import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  code: {
    display: 'flex',
  },

  number: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 132,
    height: 180,
    border: [2, 'solid'],
    fontSize: 140,
    fontWeight: 500,
    '&:not(:first-child)': {
      borderLeft: 'none',
    },
    '&:first-child': {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
    '&:last-child': {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
  },

  content: {
    width: '30%',
    '&:not(:first-child)': {
      marginLeft: 96,
    },
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: '-0.15px',
    lineHeight: '40px',
    '&:not(:last-child)': {
      marginBottom: 32,
    },
  },

  description: {
    fontSize: 16,
    lineHeight: '24px',
  },
};

export type NotFoundMessageStyles = ComponentStyles<typeof styles>;
