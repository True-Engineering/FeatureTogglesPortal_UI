import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

const TABLE_WIDTH = 916;

const NAME_WIDTH = 250;
const ACTIONS_WIDTH = 65;
const CONNECTION_STATE_WIDTH = 250;
const INSTANCES_WIDTH = 153;
const TOKEN_WIDTH =
  TABLE_WIDTH -
  NAME_WIDTH -
  ACTIONS_WIDTH -
  CONNECTION_STATE_WIDTH -
  INSTANCES_WIDTH;

export const styles = {
  root: {
    maxWidth: TABLE_WIDTH,
  },

  nameColumn: {
    width: NAME_WIDTH,
  },

  tokenColumn: {
    width: TOKEN_WIDTH,
  },

  connectionStatusColumn: {
    width: CONNECTION_STATE_WIDTH,
  },

  instancesColumn: {
    width: INSTANCES_WIDTH,
  },

  actionsColumn: {
    width: ACTIONS_WIDTH,
  },

  tokenCell: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },

  nameCell: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  iconButton: {
    margin: [-5, 0],
  },

  checkIcon: {
    width: 28,
    margin: -4,
  },

  minusIcon: {
    width: 20,
  },

  tokenUpdateButton: {
    position: 'relative',
  },

  cellWithEnvironmentForm: {
    width: TABLE_WIDTH,
    minHeight: 56,
    padding: [16, 24],
  },

  instancesButton: {
    position: 'relative',
  },

  instancesMenu: {},

  contextMenuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 12,
  },

  instancesList: {
    margin: [0, -16],
  },

  empty: {
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
  },
};

export const tokenMenuTweakStyles = { popup: { width: 315 } };

export const instancesMenuTweakStyles = { popup: { width: 550 } };

export type ProjectEnvironmentsListStyles = ComponentStyles<typeof styles>;
