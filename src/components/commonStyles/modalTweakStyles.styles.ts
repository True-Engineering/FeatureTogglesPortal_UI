import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../constants';

export const styles = {
  overlay: {
    zIndex: Z_INDEX.modal,
  },

  s: {
    '& $modal': {
      width: 556,
      padding: [36, 40],
    },

    '& $withoutFooter': {
      paddingBottom: 40,
    },
  },

  m: {
    '& $modal': {
      width: 800,
      padding: [36, 40],
    },

    '& $withoutFooter': {
      paddingBottom: 40,
    },
  },

  l: {
    '& $modal': {
      width: 960,
      padding: [36, 40],
    },

    '& $withoutFooter': {
      paddingBottom: 40,
    },
  },
};

export type ModalTweakStyles = ComponentStyles<typeof styles>;
