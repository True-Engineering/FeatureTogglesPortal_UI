export const FLIPPING_STRATEGIES = [
  'AppVersion',
  'ReleaseDate',
  'DarkLaunch',
  'RequestContext',
] as const;

// !!! при описании параметров стратегии
// необходимо использовать type, а не interface
/* eslint-disable @typescript-eslint/consistent-type-definitions */

export type IFlippingStrategyTypeProp = typeof FLIPPING_STRATEGIES[number];

export type IAppVersionStrategyParams = {
  appVersion: string;
};

export type IReleaseDateStrategyParams = {
  releaseDate: Date;
};

export type IDarkLaunchStrategyParams = {
  weight: number; // от 0 до 1
};

export type IRequestContextStrategyParams = Array<{
  name: string;
  values: string[];
}>;

/* eslint-enable @typescript-eslint/consistent-type-definitions */

export type IFlippingStrategyParams =
  | IAppVersionStrategyParams
  | IReleaseDateStrategyParams
  | IDarkLaunchStrategyParams
  | IRequestContextStrategyParams;

export type IFlippingStrategyParamsByType = {
  AppVersion: IAppVersionStrategyParams;
  ReleaseDate: IReleaseDateStrategyParams;
  DarkLaunch: IDarkLaunchStrategyParams;
  RequestContext: IRequestContextStrategyParams;
} & Record<IFlippingStrategyTypeProp, IFlippingStrategyParams>;

export type IFlippingStrategy = (
  | {
      type: 'AppVersion';
      initParams?: IAppVersionStrategyParams;
    }
  | {
      type: 'ReleaseDate';
      initParams?: IReleaseDateStrategyParams;
    }
  | {
      type: 'DarkLaunch';
      initParams?: IDarkLaunchStrategyParams;
    }
  | {
      type: 'RequestContext';
      initParams?: IRequestContextStrategyParams;
    }
) & {
  type: IFlippingStrategyTypeProp;
};
