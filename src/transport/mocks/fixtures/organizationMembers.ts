import { IFetchGetOrganizationMembersResponseRaw } from '../../mappers';

export const organizationMembers: IFetchGetOrganizationMembersResponseRaw = {
  users: [
    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 1,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        authorities: [],
        id: 3,
        lastLogin: undefined,
        status: 'PENDING',
      },
      projects: [
        {
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
    },
    {
      user: {
        userName: 'Валерия Климова',
        email: 'test@test.com',
        avatarUrl:
          'https://www.gravatar.com/avatar/67868768758.jpg?d=identicon',
        authorities: [],
        id: 12,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        authorities: [],
        id: 13,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Семен Гусев',
        email: 'test@test.com',
        authorities: [],
        id: 14,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        authorities: [],
        id: 15,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        authorities: [],
        id: 16,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        authorities: [],
        id: 17,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        authorities: [],
        id: 18,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        authorities: [],
        id: 19,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Иванов Иван',
        email: 'test@test.com',
        authorities: [],
        id: 20,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Петров Василий',
        email: 'vasiliy.petrov@test.com',
        authorities: [],
        id: 21,
        lastLogin: undefined,
        status: 'ACTIVE',
      },
      projects: [
        {
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
      ],
    },
    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        authorities: [],
        id: 22,
        lastLogin: undefined,
        status: 'PENDING',
      },
      projects: [
        {
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
    },
    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        authorities: [],
        id: 23,
        lastLogin: undefined,
        status: 'PENDING',
      },
      projects: [
        {
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
    },
    {
      user: {
        userName: 'Кент Кларк',
        email: 'kent.clark@metropolis.com',
        authorities: [],
        id: 25,
        lastLogin: undefined,
        status: 'PENDING',
      },
      projects: [
        {
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
          projectId: 1,
          projectName: 'NBA',
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
      ],
    },
    {
      user: {
        userName: 'Сергей Антонов',
        email: 'kent.clark@metropolis.com',
        authorities: [],
        id: 26,
        lastLogin: undefined,
        status: 'PENDING',
      },
      projects: [
        {
          projectId: 1,
          projectName: 'NBA',
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
              environmentRole: 'NO_ACCESS',
            },
            {
              environmentId: 3,
              environment: 'prod',
              environmentRole: 'NO_ACCESS',
            },
            {
              environmentId: 4,
              environment: 'uat-2',
              environmentRole: 'NO_ACCESS',
            },
            {
              environmentId: 5,
              environment: 'prod-2',
              environmentRole: 'NO_ACCESS',
            },
            {
              environmentId: 6,
              environment: 'uat-3',
              environmentRole: 'NO_ACCESS',
            },
            {
              environmentId: 7,
              environment: 'prod-3',
              environmentRole: 'NO_ACCESS',
            },
          ],
        },
      ],
    },
  ],
};

export default organizationMembers;
