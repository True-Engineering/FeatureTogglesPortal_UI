import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  head: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBottom: 16,
    marginLeft: 32,
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginLeft: 32,
  },

  row: {
    display: 'flex',
    wordBreak: 'break-word',
  },

  name: {
    display: 'inline-block',
    width: 88,
    marginRight: 16,
    flexShrink: 0,
  },

  value: {
    display: 'flex',
    gap: 4,
  },

  changes: {
    display: 'flex',
    gap: 8,
  },

  old: {
    display: 'inline-block',
    maxWidth: 208,
    flexShrink: 0,
  },

  environmentChanges: {
    display: 'flex',
    alignItems: 'center',
    padding: [13, 16],
    borderRadius: 8,
    marginLeft: -16,
  },

  environmentName: {
    display: 'inline-block',
    minWidth: 88,
    marginRight: 16,
    wordBreak: 'break-all',
  },

  environmentOldValue: {},

  // Icons styles

  icon: {
    display: 'flex',
    alignItems: 'flex-start',
    flexShrink: 0,
  },

  arrowIcon: {
    width: 16,
    height: 20,
    alignItems: 'center',
  },

  circleIcon: {
    width: 20,
    height: 20,
  },

  disableNewIcon: {},

  enableNewIcon: {},

  // text

  title: {
    fontWeight: 700,
    fontSize: 16,
  },

  lightGreyText: {},

  greyBoldText: {
    fontWeight: 700,
    lineHeight: '18px',
  },
};

export const textWithStatusTweakStyles = {
  root: {
    marginLeft: -8,
  },
  s: {
    borderRadius: 2,
    padding: [2, 8],
    lineHeight: '16px',
  },
};

export type HistoryOfChangesListItemContentStyles = ComponentStyles<
  typeof styles
>;
