import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

const MAX_TABLE_WIDTH = 1100;

const SPRINT_WIDTH = 120;
const TYPE_WIDTH = 130;
const TAG_WIDTH = 100;
const STATE_WIDTH = 250;
const ACTION_WIDTH = 50;
const TASK_WIDTH =
  MAX_TABLE_WIDTH -
  (SPRINT_WIDTH + TYPE_WIDTH + TAG_WIDTH + STATE_WIDTH + ACTION_WIDTH);

const SELECT_FILTER_WIDTH = 210;
const LEFT_PADDING = 36;

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: MAX_TABLE_WIDTH,
    fontSize: 14,
  },

  filterContainer: {
    height: 82,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 14,
    padding: 20,
    gap: 20,
    marginBottom: 24,
  },

  taskFilter: {
    flexGrow: 1,
  },

  typeFilter: {
    width: SELECT_FILTER_WIDTH,
  },

  tagFilter: {
    width: SELECT_FILTER_WIDTH,
  },

  table: {
    maxWidth: MAX_TABLE_WIDTH,
    borderCollapse: 'collapse',
    tableLayout: 'fixed',

    '& td': {
      padding: [15, 6],
      verticalAlign: 'top',
    },

    '& th': {
      padding: [15, 6],
      fontWeight: 'normal',
    },
  },

  headRow: {
    '& th:first-child': {
      paddingLeft: LEFT_PADDING,
    },
  },

  sprintHeader: {
    width: SPRINT_WIDTH,
  },

  taskHeader: {
    width: TASK_WIDTH,
  },

  typeHeader: {
    width: TYPE_WIDTH,
  },

  tagHeader: {
    width: TYPE_WIDTH,
  },

  actionHeader: {
    width: ACTION_WIDTH,
  },

  flagStateHeader: {
    width: STATE_WIDTH,
  },

  groupSort: {
    textAlign: 'left',
  },
};

export const inputTweakStyles = {
  inputWrapper: {
    height: 44,

    '& $label, & $input': {
      marginTop: 1,
    },
  },
};

export const selectTweakStyles = {
  tweakInput: {
    inputWrapper: {
      height: 44,
    },
  },
};

export type FlagsTableStyles = ComponentStyles<typeof styles>;
