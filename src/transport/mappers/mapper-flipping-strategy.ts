import { isValid, parse, format } from 'date-fns';
import { DELIMITER_VALUES_OF_REQUEST_CONTEXT_PARAMS } from '../../constants';
import {
  IAppVersionStrategyParams,
  IDarkLaunchStrategyParams,
  IFlippingStrategy,
  IFlippingStrategyParams,
  IFlippingStrategyTypeProp,
  IReleaseDateStrategyParams,
  IRequestContextStrategyParams,
} from '../../types';
import { IRawFlippingStrategy, IRawFlippingStrategyParams } from './types';
import { trimStringsInObject } from './common-mappers';

const RELEASE_DATE_FORMAT = 'yyyy-MM-dd-HH:mm';

// TODO явно описать тип этого объекта
export const flippingStrategySettingsByType = {
  AppVersion: {
    rawType:
      'ru.trueengineering.feature.flag.portal.strategy.AppVersionStrategy',

    initParams: {
      appVersion: '1.0.0',
    },

    emptyParams: undefined,

    fromApi: ({
      appVersion,
    }: IRawFlippingStrategyParams): IAppVersionStrategyParams => ({
      appVersion,
    }),

    toApi: (params: IAppVersionStrategyParams): IRawFlippingStrategyParams =>
      params,
  },
  ReleaseDate: {
    rawType: 'org.ff4j.strategy.time.ReleaseDateFlipStrategy',

    initParams: {
      releaseDate: '2021-12-31-23:59',
    },

    emptyParams: undefined,

    fromApi: ({
      releaseDate,
    }: IRawFlippingStrategyParams): IReleaseDateStrategyParams | undefined => {
      try {
        const dt = parse(releaseDate, RELEASE_DATE_FORMAT, new Date());
        if (isValid(dt)) {
          return { releaseDate: dt };
        } else {
          return undefined;
        }
      } catch {
        return undefined;
      }
    },

    toApi: ({ releaseDate }: IReleaseDateStrategyParams) => ({
      releaseDate: format(releaseDate, RELEASE_DATE_FORMAT),
    }),
  },
  DarkLaunch: {
    rawType: 'org.ff4j.strategy.DarkLaunchStrategy',

    initParams: {
      weight: 0.5,
    },

    emptyParams: undefined,

    fromApi: ({
      weight,
    }: IRawFlippingStrategyParams): IDarkLaunchStrategyParams => ({
      weight: parseFloat(weight),
    }),

    toApi: ({
      weight,
    }: IDarkLaunchStrategyParams): IRawFlippingStrategyParams => ({
      weight: String(weight),
    }),
  },
  RequestContext: {
    rawType:
      'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',

    initParams: [],

    emptyParams: [],

    fromApi: (obj: IRawFlippingStrategyParams): IRequestContextStrategyParams =>
      Object.entries(obj)
        .map(([name, value]) => ({
          name,
          values: value.split(DELIMITER_VALUES_OF_REQUEST_CONTEXT_PARAMS),
        }))
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          }),
        ),

    toApi: (
      params: IRequestContextStrategyParams,
    ): IRawFlippingStrategyParams =>
      Object.fromEntries(
        params.map(({ name, values }) => [
          name,
          values.join(DELIMITER_VALUES_OF_REQUEST_CONTEXT_PARAMS),
        ]),
      ),
  },
};

export const findFlippingStrategyByRawType = (
  value: string,
): IFlippingStrategyTypeProp | undefined =>
  (Object.keys(
    flippingStrategySettingsByType,
  ) as IFlippingStrategyTypeProp[]).find(
    k => flippingStrategySettingsByType[k].rawType === value,
  );

export const mapperFlippingStrategyFromApi = (
  flippingStrategy: IRawFlippingStrategy,
): IFlippingStrategy | undefined => {
  const flippingStrategyType = findFlippingStrategyByRawType(
    flippingStrategy.type,
  );

  if (flippingStrategyType === undefined) {
    return undefined;
  }

  const { fromApi } = flippingStrategySettingsByType[flippingStrategyType];

  return {
    type: flippingStrategyType,
    initParams:
      flippingStrategy.initParams === undefined
        ? undefined
        : fromApi(flippingStrategy.initParams),
  } as IFlippingStrategy;
};

export const mapperFlippingStrategyToApi = (
  flippingStrategy: IFlippingStrategy,
): IRawFlippingStrategy | undefined => {
  const { rawType, toApi } = flippingStrategySettingsByType[
    flippingStrategy.type
  ];

  return {
    type: rawType,
    initParams:
      flippingStrategy.initParams === undefined
        ? undefined
        : trimStringsInObject(
            toApi(
              // TODO так как сейчас не описан явно тип flippingStrategySettingsByType,
              // то приходится приводить вот так
              flippingStrategy.initParams as UnionToIntersection<IFlippingStrategyParams>,
            ),
          ),
  };
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
