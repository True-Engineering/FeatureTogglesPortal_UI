import { createUseStyles } from 'react-jss';

export const useCollapseAnimationStyles = createUseStyles({
  enter: {
    overflow: 'hidden',
    maxHeight: 0,
  },

  enterActive: {
    maxHeight: 1000,
    transition: 'max-height 0.3s ease-in-out',
  },

  exit: {
    maxHeight: 1000,
  },

  exitActive: {
    overflow: 'hidden',
    maxHeight: 0,
    transition: 'max-height 0.3s ease-in-out',
  },
});
