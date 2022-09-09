import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

export const styles = {
  root: {
    position: 'relative',
  },

  trigger: {},

  popupWrapper: {
    zIndex: Z_INDEX.contextMenu,

    // например, если есть скролл у контейнера-родителя,
    // и popup находится за пределами viewbox родителя, то его надо скрыть
    "&[data-popper-reference-hidden='true']": {
      opacity: 0,
      pointerEvents: 'none',
    },
  },

  popup: {
    padding: 24,
  },

  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
};

export type ContextPopupStyles = ComponentStyles<typeof styles>;
