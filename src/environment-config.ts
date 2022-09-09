export const environments = {
  DEV: 'development',
  DEV_DOCKER: 'development-docker',
  PROD: 'production',
  TEST: 'test',
};

export const environmentConfig = {
  URL: {
    [environments.PROD]: '',
    [environments.DEV]: '',
    [environments.DEV_DOCKER]: '',
  },
  PORT: {},
};

export const urlPath = '';
