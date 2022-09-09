import type { INestedValidationConfig } from '@true-engineering/true-react-common-validator';
import { requiredValidator } from '../../../utils';
import type {
  IFlippingStrategy,
  IFlippingStrategyTypeProp,
} from '../../../types';
import { MIN_LEN_OF_REQUEST_CONTEXT_PARAMS } from './strategiesParams';

const validationConfigForFlippingStrategy: {
  [key in IFlippingStrategyTypeProp]?: INestedValidationConfig<
    IFlippingStrategy | undefined
  >;
} = {
  AppVersion: {
    initParams: {
      appVersion: { ...requiredValidator },
    },
  },
  ReleaseDate: {
    initParams: {
      releaseDate: { ...requiredValidator },
    },
  },
  DarkLaunch: {
    initParams: {
      weight: {
        ...requiredValidator,
        validators: {
          between0and1: {
            message: 'errors.numberBetween0and1',
            validate: v => v === undefined || (0 < v && v <= 1),
          },
        },
      },
    },
  },
  RequestContext: {
    initParams: {
      itemConfig: {
        name: { ...requiredValidator },
        values: { ...requiredValidator },
      },
      commonValidators: {
        minLength: {
          value: MIN_LEN_OF_REQUEST_CONTEXT_PARAMS,
          message: 'errors.minLengthParams',
        },
      },
    },
  },
};

export const getValidationConfig = (
  flippingStrategy?: IFlippingStrategy,
): INestedValidationConfig<IFlippingStrategy | undefined> =>
  flippingStrategy === undefined
    ? {}
    : validationConfigForFlippingStrategy[flippingStrategy.type] ?? {};
