import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addMinutes, format } from 'date-fns';
import { Button, Select } from '@true-engineering/true-react-common-ui-kit';
import { RadioGroup } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { convertEnvironmentToString, getDateFnsLocale } from '../../../utils';
import { LONG_DATE_TIME_FORMAT } from '../../../constants';
import { freezingTimeList } from './constants';
import { ILocale, IProjectEnvironment } from '../../../types';
import { formStyles } from '../../commonStyles';
import { styles } from './EnableFreezeFeatureFlagsForm.styles';

export interface IEnableFreezeFeatureFlagsFormValues {
  environment?: IProjectEnvironment;
  freezingTime?: number;
}

export interface IEnableFreezeFeatureFlagsFormProps {
  data: IProjectEnvironment[];
  onSubmit: (environment: IProjectEnvironment, endDate: Date) => void;
  onClose: () => void;
}

const EnableFreezeFeatureFlagsForm: FC<IEnableFreezeFeatureFlagsFormProps> = ({
  data,
  onSubmit,
  onClose,
}) => {
  const [values, setValues] = useState<IEnableFreezeFeatureFlagsFormValues>({
    environment: undefined,
    freezingTime: undefined,
  });
  const [isLoading, setLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const dateFnsLocale = getDateFnsLocale(i18n.language as ILocale);

  const { classes } = useFeatureTogglesTheme(
    'EnableFreezeFeatureFlagsForm',
    styles,
    {},
  );

  const { classes: formClasses } = useFeatureTogglesTheme(
    'formStyles',
    formStyles,
    {},
  );

  const isValid =
    values.environment !== undefined && values.freezingTime !== undefined;

  const timeRadioGroupOptions = freezingTimeList.map(
    ({ hours, minutes, value }) => ({
      key: String(value),
      value: String(value),
      children: `${hours} ${t('hoursShort')} ${minutes} ${t('minutesShort')}`,
      groupName: 'freezingTime',
      onChange: (v: string) => {
        const numberValue = parseInt(v, 10);
        return handleChange('freezingTime')(numberValue);
      },
    }),
  );

  const freezingEndDate =
    values.freezingTime !== undefined
      ? addMinutes(new Date(), values.freezingTime)
      : undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { environment } = values;

    if (environment === undefined || freezingEndDate === undefined) {
      console.error(
        "Feature Flags can't be frozen because params are incorrect",
      );
      return;
    }

    setLoading(true);

    try {
      await onSubmit(environment, freezingEndDate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleChange = <T extends IEnableFreezeFeatureFlagsFormValues>(
    k: keyof T,
  ) => (newValue: T[keyof T]) => {
    setValues(prevValues => ({
      ...prevValues,
      [k]: newValue,
    }));
  };

  return (
    <form className={formClasses.root} onSubmit={handleSubmit}>
      <div className={formClasses.title}>
        {t('freezeFeatureFlags.freezeTitle')}
      </div>
      <div>
        <div className={formClasses.section}>
          <span className={classes.sectionTitle}>
            {t('freezeFeatureFlags.chooseEnvironment')}
          </span>
          <Select
            label={t('environment')}
            value={values.environment}
            options={data}
            onChange={handleChange('environment')}
            convertValueToString={convertEnvironmentToString}
          />
        </div>
        <div className={formClasses.section}>
          <span className={classes.sectionTitle}>
            {t('freezeFeatureFlags.chooseTime')}
          </span>
          <RadioGroup options={timeRadioGroupOptions} />
        </div>
        {isValid && (
          <p className={classes.message}>
            {t('freezeFeatureFlags.freezeMessage', {
              name: values.environment?.name,
            })}
            <span className={classes.time}>
              {freezingEndDate !== undefined &&
                format(freezingEndDate, LONG_DATE_TIME_FORMAT, {
                  locale: dateFnsLocale,
                })}
            </span>
          </p>
        )}
      </div>
      <div className={classes.buttonsContainer}>
        <Button
          view="secondary"
          type="button"
          size="xl"
          onClick={onClose}
          isDisabled={isLoading}
        >
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          size="xl"
          isDisabled={!isValid}
          isLoading={isLoading}
        >
          {t('save')}
        </Button>
      </div>
    </form>
  );
};

export default EnableFreezeFeatureFlagsForm;
