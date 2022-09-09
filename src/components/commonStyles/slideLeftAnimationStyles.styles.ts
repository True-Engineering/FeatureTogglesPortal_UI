import { createUseStyles } from 'react-jss';

export const useSlideLeftAnimationStyles = createUseStyles({
  enter: {
    opacity: 0,
    transform: 'translateX(20%)',
  },

  enterActive: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: '0.3s ease',
    transitionProperty: 'transform, opacity',
  },

  exit: {
    opacity: 1,
    transform: 'translateX(0)',
  },

  exitActive: {
    opacity: 0,
    transform: 'translateX(20%)',
    transition: '0.3s ease',
    transitionProperty: 'transform, opacity',
  },
});
