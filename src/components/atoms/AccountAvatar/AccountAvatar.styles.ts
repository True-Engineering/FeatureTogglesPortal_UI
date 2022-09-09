import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

const AVATAR_SIZE = 32;

export const avatarColors = [
  'violet-blue',
  'orange-red',
  'cyan-blue',
  'salmon-red',
  'orange-green',
  'blue-pink',
  'pink-blue',
  'orange-yellow',
  'yellow-magenta',
] as const;

export const styles = {
  imageAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: '50%',
  },

  wordAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: '50%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,

    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '18px',
    color: colors.CLASSIC_WHITE,
  },

  'violet-blue': {
    background: 'linear-gradient(47.82deg, #BB6BC5 4.46%, #9193FF 100%)',
  },

  'orange-red': {
    background: 'linear-gradient(45deg, #EEB35A 0%, #FF7864 100%)',
  },

  'cyan-blue': {
    background: 'linear-gradient(45deg, #A4F8D9 0%, #41BDE4 100%)',
  },

  'salmon-red': {
    background: 'linear-gradient(45deg, #FFBFBF 0%, #FE6262 100%)',
  },

  'orange-green': {
    background: 'linear-gradient(225deg, #FFBE5E 0%, #A3F97A 100%)',
  },

  'blue-pink': {
    background: 'linear-gradient(225deg, #3671E6 0%, #F8ADFF 100%)',
  },

  'pink-blue': {
    background: 'linear-gradient(45deg, #FA77B6 0%, #5BBDF4 100%)',
  },

  'orange-yellow': {
    background: 'linear-gradient(225deg, #FFB431 0%, #F2F466 100%)',
  },

  'yellow-magenta': {
    background: 'linear-gradient(45deg, #FFDB5A 0%, #FF83F3 100%)',
  },
};

export type AccountAvatarStyles = ComponentStyles<typeof styles>;
