import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    width: '100%',
    height: '100%',
  },

  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export type GlobalPreloaderStyles = ComponentStyles<typeof styles>;
