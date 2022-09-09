import { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    listStyleType: 'none',
  },
};

export type RadioGroupStyles = ComponentStyles<typeof styles>;
