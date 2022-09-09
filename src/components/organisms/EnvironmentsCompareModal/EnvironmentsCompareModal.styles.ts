import {
  ComponentStyles,
  ModalStyles,
} from '@true-engineering/true-react-common-ui-kit';

export const MODAL_HORIZONTAL_PADDING = 32;

export const styles = {
  root: {},

  table: {
    marginTop: 32,
  },

  emptyTable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: [60, 0],
  },

  loading: {
    width: 60,
    height: 60,
  },
};

export type EnvironmentsCompareModalStyles = ComponentStyles<typeof styles>;

export const modalStyles: ModalStyles = {
  l: {
    '& $modal': {
      width: 960,
      paddingLeft: MODAL_HORIZONTAL_PADDING,
      paddingRight: MODAL_HORIZONTAL_PADDING,
    },
  },
};
