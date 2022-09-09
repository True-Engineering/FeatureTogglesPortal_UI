import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { APP_WIDTH } from '../../../constants';

export const styles = {
  root: {
    width: '100%',
    padding: [8, 0],
    marginBottom: 16,
  },

  content: {
    margin: [0, 'auto'],
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    width: APP_WIDTH,
  },

  circle: {
    borderRadius: '50%',
    width: 24,
    height: 24,
    marginRight: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 20,
    height: 20,
  },
};

export type FreezeNotificationStyles = ComponentStyles<typeof styles>;
