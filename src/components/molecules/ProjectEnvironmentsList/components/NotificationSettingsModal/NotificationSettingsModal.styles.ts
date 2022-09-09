import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 28,
    '&:last-child': {
      marginBottom: 0,
    },
  },

  name: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '28px',
  },

  message: {
    lineHeight: '22px',
  },

  switcherMessage: {
    marginLeft: 48,
  },
};

export type NotificationSettingsModalStyles = ComponentStyles<typeof styles>;
