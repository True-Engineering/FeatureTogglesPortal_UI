import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@true-engineering/true-react-common-ui-kit';
import { INestedErrorsResult } from '@true-engineering/true-react-common-validator';
import { LinkButton, MultipleInput, IconButton } from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { hasError, getErrorMessageFunction } from '../../../../../utils';
import { IRequestContextStrategyParams } from '../../../../../types';
import { styles } from './RequestContextParams.styles';

export interface IRequestContextParams {
  params?: IRequestContextStrategyParams;
  onChange: (params?: IRequestContextStrategyParams) => void;
  errors?: INestedErrorsResult<IRequestContextStrategyParams>;
}

type IRequestContextStrategyItem = IRequestContextStrategyParams[number];

const EMPTY_PARAM: IRequestContextStrategyItem = {
  name: '',
  values: [],
};

const EMPTY_TOUCHED: Record<keyof IRequestContextStrategyItem, boolean> = {
  name: false,
  values: false,
};

export const MIN_LEN_OF_REQUEST_CONTEXT_PARAMS = 1;

const initInnerValues = (
  params: IRequestContextStrategyParams,
): IRequestContextStrategyParams =>
  params.length >= MIN_LEN_OF_REQUEST_CONTEXT_PARAMS
    ? params
    : [
        ...params,
        ...Array(MIN_LEN_OF_REQUEST_CONTEXT_PARAMS - params.length)
          .fill(undefined)
          .map(() => ({ ...EMPTY_PARAM })),
      ];

const RequestContextParams: FC<IRequestContextParams> = ({
  params = [],
  onChange,
  errors,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'RequestContextParams',
    styles,
    {},
  );
  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [innerParams, setInnerParams] = useState<IRequestContextStrategyParams>(
    initInnerValues(params),
  );

  const [touched, setTouched] = useState<
    Array<Record<keyof IRequestContextStrategyItem, boolean>>
  >(innerParams.map(() => ({ ...EMPTY_TOUCHED })));

  const handleChange = (newParams: IRequestContextStrategyParams) => {
    setInnerParams(newParams);

    const notEmptyParams = newParams.map(({ name, values }) => ({
      name,
      values: values.filter(v => v !== ''),
    }));

    onChange(notEmptyParams);
  };

  const onAdd = () => {
    setTouched(prevValues => [...prevValues, { ...EMPTY_TOUCHED }]);
    handleChange([...innerParams, { ...EMPTY_PARAM }]);
  };

  const onRemove = (index: number) => {
    handleChange(innerParams.filter((_, i) => i !== index));
    setTouched(prevValues => prevValues.filter((_, i) => i !== index));
  };

  const handleChangeRow = <T extends IRequestContextStrategyItem>(
    editableField: keyof T,
    index: number,
  ) => (newFieldValue: T[keyof T]) => {
    handleChange(
      innerParams.map((item, i) =>
        i === index ? { ...item, [editableField]: newFieldValue } : item,
      ),
    );
  };

  const handleBlur = <T extends IRequestContextStrategyItem>(
    editableField: keyof T,
    index: number,
  ) => () => {
    setTouched(prevValues =>
      prevValues.map((v, i) =>
        i === index ? { ...v, [editableField]: true } : v,
      ),
    );
  };

  if (!Array.isArray(params)) {
    console.error('params of request context strategy is not array', params);
    return null;
  }

  const canRemoveItems = innerParams.length > MIN_LEN_OF_REQUEST_CONTEXT_PARAMS;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {innerParams.map(({ name, values }, i) => {
          const itemErrors = (errors ?? [])[i];
          const itemTouch = touched[i];
          return (
            <div key={i} className={classes.row}>
              <div className={classes.paramName}>
                <Input
                  label={t('parameter')}
                  value={name}
                  onChange={handleChangeRow('name', i)}
                  onBlur={handleBlur('name', i)}
                  isInvalid={hasError(itemErrors?.name) && itemTouch?.name}
                  errorMessage={getErrorMessage(itemErrors?.name)}
                  isRequired
                />
              </div>
              <div className={classes.paramValues}>
                <MultipleInput
                  label={t('value')}
                  values={values}
                  onChange={handleChangeRow('values', i)}
                  onBlur={handleBlur('values', i)}
                  isInvalid={hasError(itemErrors?.values) && itemTouch?.values}
                  errorMessage={getErrorMessage(itemErrors?.values)}
                />
              </div>
              {canRemoveItems && (
                <div className={classes.removeIcon}>
                  <IconButton icon="trash-can" onClick={() => onRemove(i)} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <LinkButton
        icon="plus"
        text={t('addParameter')}
        onClick={() => onAdd()}
        hasCircleUnderIcon
        isBold
        size="small"
      />
    </div>
  );
};

export default RequestContextParams;
