import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {},

  preloader: {
    width: 70,
    margin: 'auto',
  },

  title: {
    marginBottom: 16,
  },

  titleControls: {
    display: 'flex',
    gap: 12,
  },

  tab: {},
};

export type InviteMembersToProjectStyles = ComponentStyles<typeof styles>;
