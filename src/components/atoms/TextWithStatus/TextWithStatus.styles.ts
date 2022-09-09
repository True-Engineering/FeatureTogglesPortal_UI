import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { rgba } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    verticalAlign: 'middle',
  },

  xs: {
    fontSize: 12,
    padding: [2, 8],
    fontWeight: 'normal',
    borderRadius: 11,
  },

  s: {
    fontSize: 13,
    padding: [4, 8],
    fontWeight: 'bold',
    borderRadius: 8,
  },

  m: {
    fontSize: 16,
    padding: [8, 12],
    fontWeight: 'bold',
    borderRadius: 8,
  },

  green: {
    backgroundColor: rgba('#D4E3AC', 0.4),
    color: '#769E19',
  },

  blue: {
    backgroundColor: '#EBF1FF',
    color: '#577EDC',
  },

  grey: {
    backgroundColor: '#ECEFF5',
    color: '#7A869A',
  },

  orange: {
    backgroundColor: rgba('#FCD3A9', 0.4),
    color: '#E5741C',
  },

  red: {
    backgroundColor: rgba('#F7949A', 0.25),
    color: '#F14D56',
  },
};

export type TextWithStatusStyles = ComponentStyles<typeof styles>;
