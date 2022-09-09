import { TFunction } from 'i18next';
import {
  INestedErrors,
  INestedErrorsResult,
} from '@true-engineering/true-react-common-validator';
import { isArrayNotEmpty } from './common';

export const hasError = (error?: INestedErrors): boolean =>
  error !== undefined && isArrayNotEmpty(error.errors);

export const getErrorMessageFunction = (t: TFunction) => (
  error?: INestedErrors,
): string | undefined =>
  hasError(error) ? t(error?.errors?.[0] ?? '') : undefined;

export const hasAnyErrorsInside = <V>(obj: INestedErrorsResult<V>): boolean =>
  Object.entries(obj).some(([key, value]) => {
    if (key === 'errors' && Array.isArray(value) && value.length > 0) {
      return true;
    }

    if (typeof value === 'object') {
      return hasAnyErrorsInside(
        (value as unknown) as INestedErrorsResult<V[keyof V]>,
      );
    }

    return false;
  });

const requiredValidator = {
  commonValidators: {
    required: {
      message: '',
    },
  },
};

export { requiredValidator };
