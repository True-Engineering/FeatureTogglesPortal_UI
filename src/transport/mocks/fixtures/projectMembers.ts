import { NullAsUndefined } from '../types';
import { IFetchGetProjectMembersResponseRaw } from '../../mappers';

export const projectMembers: NullAsUndefined<IFetchGetProjectMembersResponseRaw> = {
  users: [
    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 1,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'ADMIN',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'VIEWER',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'VIEWER',
        },
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/678687683358.jpg?d=identicon',
        authorities: [],
        id: 2,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'ADMIN',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'EDITOR',
        },
      ],
    },
    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/6786871113358.jpg?d=identicon',
        authorities: [],
        id: 3,
        lastLogin: null,
        status: 'PENDING',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'MEMBER',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'NO_ACCESS',
        },
      ],
    },

    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 12,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'MEMBER',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'VIEWER',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'VIEWER',
        },
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/678687683358.jpg?d=identicon',
        authorities: [],
        id: 13,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'MEMBER',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'EDITOR',
        },
      ],
    },

    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 14,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'MEMBER',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'VIEWER',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'VIEWER',
        },
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/678687683358.jpg?d=identicon',
        authorities: [],
        id: 15,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'ADMIN',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'EDITOR',
        },
      ],
    },

    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 16,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'ADMIN',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'VIEWER',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'VIEWER',
        },
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/678687683358.jpg?d=identicon',
        authorities: [],
        id: 17,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'ADMIN',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'EDITOR',
        },
      ],
    },

    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 18,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectRole: 'ADMIN',
      projectId: 0,
      projectName: 'Smart',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'VIEWER',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'VIEWER',
        },
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/678687683358.jpg?d=identicon',
        authorities: [],
        id: 19,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'ADMIN',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'EDITOR',
        },
      ],
    },

    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 20,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'ADMIN',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'VIEWER',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'VIEWER',
        },
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/678687683358.jpg?d=identicon',
        authorities: [],
        id: 21,
        lastLogin: null,
        status: 'ACTIVE',
      },
      projectId: 0,
      projectName: 'Smart',
      projectRole: 'MEMBER',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'EDITOR',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'EDITOR',
        },
      ],
    },

    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/6786871113358.jpg?d=identicon',
        authorities: [],
        id: 22,
        lastLogin: null,
        status: 'PENDING',
      },
      projectRole: 'MEMBER',
      projectId: 0,
      projectName: 'Smart',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'NO_ACCESS',
        },
      ],
    },

    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/6786871113358.jpg?d=identicon',
        authorities: [],
        id: 23,
        lastLogin: null,
        status: 'PENDING',
      },
      projectRole: 'ADMIN',
      projectId: 0,
      projectName: 'Smart',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'NO_ACCESS',
        },
      ],
    },

    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/6786871113358.jpg?d=identicon',
        authorities: [],
        id: 25,
        lastLogin: null,
        status: 'PENDING',
      },
      projectRole: 'ADMIN',
      projectId: 0,
      projectName: 'Smart',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'NO_ACCESS',
        },
      ],
    },

    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/6786871113358.jpg?d=identicon',
        authorities: [],
        id: 26,
        lastLogin: null,
        status: 'PENDING',
      },
      projectRole: 'ADMIN',
      projectId: 0,
      projectName: 'Smart',
      environmentPermissions: [
        {
          environmentId: 0,
          environment: 'dev',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 1,
          environment: 'qa',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 2,
          environment: 'uat',
          environmentRole: 'NO_ACCESS',
        },
        {
          environmentId: 3,
          environment: 'prod',
          environmentRole: 'NO_ACCESS',
        },
      ],
    },
  ],
};
