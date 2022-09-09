import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

export const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: 440,
    pointerEvents: 'none',
    zIndex: Z_INDEX.toaster,
    padding: 30,
    paddingTop: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  toaster: {
    width: 380,
    marginBottom: 6,
    pointerEvents: 'auto',
    cursor: 'pointer',
  },

  errorMessage: {
    fontSize: 12,
    marginTop: 2,
  },
};

export type ToasterManagerStyles = ComponentStyles<typeof styles>;
