import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    position: 'relative',
  },

  tooltip: {
    position: 'absolute',
    top: 'calc(-100% - 10px)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'max-content',
    display: 'none',

    '$root:hover &': {
      display: 'block',
    },
  },
};

export type CopyToClipboardButtonStyles = ComponentStyles<typeof styles>;
