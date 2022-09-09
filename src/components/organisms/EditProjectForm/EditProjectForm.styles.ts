import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

export const styles = {};

export const deleteConfirmTweakStyles = {
  popup: { width: 300 },

  popupWrapper: {
    zIndex: Z_INDEX.modal + Z_INDEX.contextMenu,
  },
};

export type EditProjectFormStyles = ComponentStyles<typeof styles>;
