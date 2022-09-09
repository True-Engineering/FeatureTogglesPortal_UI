import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
    zIndex: Z_INDEX.contextMenu,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'end',
    gap: 12,
    marginTop: 28,
  },

  message: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 'bold',
  },
};

export const buttonTweakStyles = {
  s: {
    height: 40,
  },
};

export type ConfirmationStyles = ComponentStyles<typeof styles>;
