import { NullAsUndefined } from '../types';
import { IFetchGetCompareEnvironmentsStateResponseRaw } from '../../mappers';

export const compareEnvironmentsState: NullAsUndefined<IFetchGetCompareEnvironmentsStateResponseRaw> = {
  enable: [
    {
      uid: '344',
      description: 'SomeName',
      group: null,
      type: 'RELEASE',
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: null,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: true,
        },
      ],
    },
  ],
  disable: [
    {
      uid: '213',
      description: 'Проверка',
      group: null,
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {
              userName: 'myastrebov',
            },
          },
          enable: false,
        },
      ],
    },
    {
      uid: '320',
      description: 'Test flag',
      group: 'Sprint 67',
      type: 'RELEASE',
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: false,
        },
      ],
    },
    {
      uid: 'loss_settlement',
      description: '3330. Android. FF. Отключить создание заявления',
      group: null,
      type: 'RELEASE',
      sprint: 'Iteration 11',
      tags: ['Android'],
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {
              userName: 'myastrebov',
            },
          },
          enable: false,
        },
      ],
    },
    {
      uid: '321',
      description: 'hello2',
      group: null,
      type: 'SYSTEM',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: false,
        },
      ],
    },
    {
      uid: '770',
      description: 'Тут будет ваша задача',
      group: null,
      type: 'RELEASE',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: true,
        },
      ],
    },
    {
      uid: '212',
      description: 'awasaawrersfserfserfawdawdkho;ADW',
      group: null,
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: false,
        },
      ],
    },
    {
      uid: '215',
      description: 'Тестовое редактирование описания',
      group: null,
      type: 'RELEASE',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: false,
        },
      ],
    },
    {
      uid: '1',
      description: 'Test-feature',
      group: null,
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: false,
        },
      ],
    },
    {
      uid: '34c0fb19-3f8b-40da-b4d9-7e6ad6c89ff1',
      description: 'Test-feature',
      group: null,
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: false,
        },
      ],
    },
    {
      uid: '769',
      description: 'финальная проверочка',
      group: 'Sprint 68',
      type: 'SYSTEM',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: true,
        },
      ],
    },
    {
      uid: '324',
      description: 'hello321',
      group: null,
      tags: ['SYSTEM'],
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: false,
        },
      ],
    },
    {
      uid: '346',
      description: 'еще один флаг',
      group: null,
      type: 'RELEASE',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: true,
        },
      ],
    },
    {
      uid: '342',
      description: 'Проверочный флаг',
      group: null,
      type: 'RELEASE',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: true,
        },
      ],
    },
    {
      uid: '768',
      description: 'Чтобы не было пустых полей',
      group: null,
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: null,
          enable: true,
        },
      ],
    },
  ],
};
