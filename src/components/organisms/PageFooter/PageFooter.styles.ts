import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { APP_WIDTH } from '../../../constants';

export const styles = {
  root: {
    width: '100%',
    height: 72,
    display: 'flex',
    justifyContent: 'center',
  },

  footerContent: {
    width: APP_WIDTH,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
  },
};

export type PageFooterStyles = ComponentStyles<typeof styles>;
