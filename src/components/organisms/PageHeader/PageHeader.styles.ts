import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { APP_WIDTH } from '../../../constants';

export const styles = {
  root: {
    width: APP_WIDTH,
    padding: [16, 0],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerRightSide: {
    display: 'flex',
  },

  avatar: {
    display: 'flex',
    marginRight: 2,
  },

  account: {
    display: 'flex',
    marginLeft: 24,
  },

  lang: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
  },
};

export type PageHeaderStyles = ComponentStyles<typeof styles>;
