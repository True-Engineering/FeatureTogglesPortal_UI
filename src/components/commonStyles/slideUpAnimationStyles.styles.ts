import { createUseStyles } from 'react-jss';

export const useSlideUpAnimationStyles = createUseStyles({
  enter: {
    opacity: 0,
    transform: 'translateY(15px)',
  },

  enterActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
  },

  exitActive: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  exit: {
    opacity: 0,
    transform: 'translateY(15px)',
    transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
  },
});
