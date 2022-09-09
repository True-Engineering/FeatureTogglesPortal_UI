import { IRawProjectEnvironment } from '../../../transport/mappers/types';

const projectEnvironment: IRawProjectEnvironment = {
  id: 0,
  name: 'PROD',
  authKeyExist: true,
  status: 'ACTIVE',
  permissions: [],
  emails: [{ email: 'test@mail.ru' }, { email: 'test@val.ru' }],
  instances: [
    {
      id: 0,
      name: 'prod-1',
      status: 'ACTIVE',
    },
  ],
};

export { projectEnvironment };
