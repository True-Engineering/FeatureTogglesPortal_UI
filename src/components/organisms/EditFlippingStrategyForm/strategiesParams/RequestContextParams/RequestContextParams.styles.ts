import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    width: '100%',
    height: '100%',
  },

  container: {
    width: '100%',
    height: '100%',
  },

  row: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    marginBottom: 26,

    '&:last-child': {
      marginBottom: 24,
    },
  },

  paramName: {
    display: 'flex',
    width: 188,
  },

  paramValues: {
    display: 'flex',
    flex: 1,
    paddingLeft: 10,
  },

  removeIcon: {
    position: 'absolute',
    top: '50%',
    right: -2,
    transform: 'translate(100%,-50%)',
  },
};

export type RequestContextParamsStyles = ComponentStyles<typeof styles>;
