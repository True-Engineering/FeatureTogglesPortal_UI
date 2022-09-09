import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

const STATUS_WIDTH = 182;
const UPDATED_WIDTH = 160;
const ACTIONS_WIDTH = 50;

export const styles = {
  root: {},

  nameColumn: {
    flexGrow: 1,
    overflow: 'auto',
  },

  statusColumn: {
    width: STATUS_WIDTH,
  },

  updatedColumn: {
    width: UPDATED_WIDTH,
  },

  actionsColumn: {
    width: ACTIONS_WIDTH,
    justifyContent: 'center',
  },

  nameCell: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  iconButton: {
    margin: [-5, 0],
  },
};

export type EnvironmentInstancesListStyles = ComponentStyles<typeof styles>;
