import { useEffect, useState } from 'react';
import {
  INestedErrorsResult,
  validateNestedForm,
  INestedValidationConfig,
} from '@true-engineering/true-react-common-validator';
import { hasAnyErrorsInside } from '../utils';

export interface IUseValidationResult<Values> {
  errors: INestedErrorsResult<Values>;
  forceValidationCheck: (v?: boolean) => void;
  validateForm: () => Promise<boolean>;
  clearValidation: () => void;
}

export const useValidation = <Values>({
  values,
  getConfig,
}: {
  values: Values;
  getConfig: () => INestedValidationConfig<Values>;
}): IUseValidationResult<Values> => {
  const [errors, setErrors] = useState<INestedErrorsResult<Values>>({});
  const [shouldCheckErrors, setShouldCheckErrors] = useState(false);

  const validateForm = async (): Promise<boolean> => {
    const newErrors = validateNestedForm(values, getConfig());
    const hasNewErrors = hasAnyErrorsInside(newErrors);

    if (!hasNewErrors) {
      setShouldCheckErrors(false);
    }

    setErrors(newErrors);

    return !hasNewErrors;
  };

  const clearValidation = () => {
    setShouldCheckErrors(false);
    setErrors({});
  };

  const forceValidationCheck = (v = true) => {
    setShouldCheckErrors(v);
  };

  useEffect(() => {
    if (shouldCheckErrors) {
      validateForm();
    }
  }, [values]);

  return {
    errors,
    forceValidationCheck,
    validateForm,
    clearValidation,
  };
};
