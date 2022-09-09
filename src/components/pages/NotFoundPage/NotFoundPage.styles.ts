import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { APP_WIDTH } from '../../../constants';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },

  header: {
    width: APP_WIDTH,
    paddingTop: 20,
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
};

export type NotFoundPageStyles = ComponentStyles<typeof styles>;
