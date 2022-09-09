import React, { FC } from 'react';
import { INestedErrorsResult } from '@true-engineering/true-react-common-validator';
import {
  IFlippingStrategyParams,
  IFlippingStrategy,
  IRequestContextStrategyParams,
} from '../../../../../types';
import { AppVersionParams } from '../AppVersionParams';
import { DarkLaunchParams } from '../DarkLaunchParams';
import { ReleaseDateParams } from '../ReleaseDateParams';
import { RequestContextParams } from '../RequestContextParams';

export interface IFlippingStrategyParamsProps {
  flippingStrategy: IFlippingStrategy;
  onChange: (params?: IFlippingStrategyParams) => void;
  errors?: INestedErrorsResult<IFlippingStrategy>;
}

const FlippingStrategyParams: FC<IFlippingStrategyParamsProps> = ({
  flippingStrategy,
  onChange,
  errors,
}) => {
  const paramsErrors = errors?.initParams;

  return flippingStrategy.type === 'RequestContext' ? (
    <RequestContextParams
      params={flippingStrategy.initParams}
      onChange={onChange}
      errors={
        paramsErrors as INestedErrorsResult<IRequestContextStrategyParams>
      }
    />
  ) : flippingStrategy.type === 'AppVersion' ? (
    <AppVersionParams
      params={flippingStrategy.initParams}
      onChange={onChange}
      errors={paramsErrors}
    />
  ) : flippingStrategy.type === 'ReleaseDate' ? (
    <ReleaseDateParams
      params={flippingStrategy.initParams}
      onChange={onChange}
      errors={paramsErrors}
    />
  ) : flippingStrategy.type === 'DarkLaunch' ? (
    <DarkLaunchParams
      params={flippingStrategy.initParams}
      onChange={onChange}
      errors={paramsErrors}
    />
  ) : null;
};

export default FlippingStrategyParams;
