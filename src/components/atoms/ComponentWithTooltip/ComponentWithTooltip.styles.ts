import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

export const styles = {
  root: {
    position: 'relative',
  },

  tooltip: {
    position: 'absolute',
    zIndex: Z_INDEX.tooltip,
  },

  top: {
    bottom: 'calc(100% + 4px)',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  'top-right': {
    bottom: 'calc(100% + 4px)',
    right: 0,
  },

  'top-left': {
    bottom: 'calc(100% + 4px)',
    left: 0,
  },

  right: {
    left: 'calc(100% + 4px)',
    top: '50%',
    transform: 'translateY(-50%)',
  },

  bottom: {
    top: 'calc(100% + 4px)',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  'bottom-right': {
    top: 'calc(100% + 4px)',
    right: 0,
  },

  'bottom-left': {
    top: 'calc(100% + 4px)',
    left: 0,
  },

  left: {
    right: 'calc(100% + 4px)',
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

export type ComponentWithTooltipStyles = ComponentStyles<typeof styles>;
