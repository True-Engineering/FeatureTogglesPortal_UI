import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button, Select } from '@true-engineering/true-react-common-ui-kit';
import {
  INestedErrorsResult,
  validateNestedForm,
} from '@true-engineering/true-react-common-validator';
import { useFeatureTogglesTheme } from '../../../hooks';
import { hasAnyErrorsInside } from '../../../utils';
import { flippingStrategySettingsByType } from '../../../transport';
import {
  FLIPPING_STRATEGIES,
  IFlippingStrategy,
  IFlippingStrategyParams,
} from '../../../types';
import type { IFlippingStrategyType } from './types';
import { formStyles } from '../../commonStyles';
import { FlippingStrategyParams } from './strategiesParams';
import { getValidationConfig } from './validation';

const noStrategy = 'NoStrategy' as const;
const flippingTypes: IFlippingStrategyType[] = [
  noStrategy,
  ...FLIPPING_STRATEGIES,
];

interface IEditFlippingStrategyFormProps {
  initialStrategy?: IFlippingStrategy;
  environmentName: string;
  onSaveChanges: (editedStrategy?: IFlippingStrategy) => void;
  onCancel: () => void;
}

const EditFlippingStrategyForm: FC<IEditFlippingStrategyFormProps> = ({
  initialStrategy,
  environmentName,
  onSaveChanges,
  onCancel,
}) => {
  const { classes } = useFeatureTogglesTheme('formStyles', formStyles, {});
  const { t } = useTranslation();

  const [editableStrategy, setEditableStrategy] = useState<
    IFlippingStrategy | undefined
  >(initialStrategy);

  const [errors, setErrors] = useState<
    INestedErrorsResult<IFlippingStrategy | undefined>
  >(
    validateNestedForm(editableStrategy, getValidationConfig(editableStrategy)),
  );

  useEffect(() => {
    const newErrors = validateNestedForm(
      editableStrategy,
      getValidationConfig(editableStrategy),
    );
    setErrors(newErrors);
  }, [editableStrategy]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!hasAnyErrorsInside(errors)) {
      onSaveChanges(editableStrategy);
    }
  };

  const handleChangeStrategyType = (value?: IFlippingStrategyType) => {
    if (value === noStrategy || value === undefined) {
      setEditableStrategy(undefined);
    } else {
      const { emptyParams } = flippingStrategySettingsByType[value];
      setEditableStrategy({
        type: value,
        initParams: emptyParams,
      } as IFlippingStrategy);
    }
  };

  const handleChangeStrategyParams = (
    newStrategyInitParams?: IFlippingStrategyParams,
  ) => {
    setEditableStrategy(prevFlagValues =>
      prevFlagValues === undefined
        ? undefined
        : ({
            type: prevFlagValues.type,
            initParams: newStrategyInitParams,
          } as IFlippingStrategy),
    );
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.title}>{environmentName}</div>
      <div className={clsx(classes.inputGroup, classes.input)}>
        <Select
          options={flippingTypes}
          onChange={handleChangeStrategyType}
          convertValueToString={v => t('strategy' + v)}
          value={editableStrategy?.type ?? noStrategy}
          placeholder={t('strategySelectorPlaceHolder')}
          label={t('strategySelectorPlaceHolder')}
          hasFloatingLabel
        />
      </div>
      {editableStrategy !== undefined && (
        <FlippingStrategyParams
          flippingStrategy={editableStrategy}
          onChange={handleChangeStrategyParams}
          errors={errors}
        />
      )}
      <div className={classes.buttonsContainer}>
        <div className={classes.button}>
          <Button view="secondary" size="xl" isFullWidth onClick={onCancel}>
            {t('cancel')}
          </Button>
        </div>
        <div className={classes.button}>
          <Button
            view="primary"
            size="xl"
            isFullWidth
            type="submit"
            isDisabled={hasAnyErrorsInside(errors)}
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditFlippingStrategyForm;
