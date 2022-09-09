import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

export const styles = {
  root: {
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box',
  },

  popupWrapper: {
    // по хорошему надо z-index прокидывать через tweakStyles,
    // но сейчас AutocompleteInput используется только внутри модального окна,
    // поэтому пока просто вот так
    zIndex: Z_INDEX.modal + Z_INDEX.contextMenu,

    // например, если есть скролл у контейнера-родителя,
    // и popup находится за пределами viewbox родителя, то его надо скрыть
    "&[data-popper-reference-hidden='true']": {
      opacity: 0,
      pointerEvents: 'none',
    },
  },

  listWrapper: {
    minWidth: 'calc(100% + 1px)',
    width: 'fit-content',
  },
};

export type AutocompleteInputStyles = ComponentStyles<typeof styles>;
