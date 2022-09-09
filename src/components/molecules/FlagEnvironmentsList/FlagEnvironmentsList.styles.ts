import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

const NAME_WIDTH = 170;
const STATE_WIDTH = 140;
const TABLE_WIDTH = 916;

export const styles = {
  root: {
    maxWidth: TABLE_WIDTH,
  },

  nameColumn: {
    width: NAME_WIDTH,
  },

  strategyColumn: {
    flexGrow: 1,
    overflow: 'auto',
  },

  flagStateColumn: {
    width: STATE_WIDTH,
  },

  flagStateContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  nameCell: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  iconButton: {
    margin: [-5, 0],
  },

  empty: {
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
  },

  switcher: {
    position: 'relative',
  },
};

export type FlagEnvironmentsListStyles = ComponentStyles<typeof styles>;
