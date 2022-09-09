import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@true-engineering/true-react-common-ui-kit';
import { INestedErrorsResult } from '@true-engineering/true-react-common-validator';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import {
  getErrorMessageFunction,
  getDateFnsLocale,
  getDatePickerMonths,
  hasError,
} from '../../../../../utils';
import { ILocale, IReleaseDateStrategyParams } from '../../../../../types';
import { styles } from './ReleaseDateParams.styles';

export interface IReleaseDateParams {
  params?: IReleaseDateStrategyParams;
  onChange: (params?: IReleaseDateStrategyParams) => void;
  errors?: INestedErrorsResult<IReleaseDateStrategyParams>;
}

const ReleaseDateParams: FC<IReleaseDateParams> = ({
  params = {},
  onChange,
  errors,
}) => {
  const { classes } = useFeatureTogglesTheme('ReleaseDateParams', styles, {});
  const { t, i18n } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [isTouched, setIsTouched] = useState(false);

  const dateFnsLocale = getDateFnsLocale(i18n.language as ILocale);
  const months = getDatePickerMonths(dateFnsLocale);

  return (
    <div className={classes.root}>
      <DatePicker
        months={months}
        locale={dateFnsLocale}
        label={t('releaseDate')}
        selectedDate={
          params.releaseDate === undefined ? null : params.releaseDate
        }
        onChangeDate={date => {
          if (date !== null) {
            onChange({
              releaseDate: date,
            });
          }
        }}
        onBlur={() => setIsTouched(true)}
        isInvalid={hasError(errors?.releaseDate) && isTouched}
        errorMessage={getErrorMessage(errors?.releaseDate)}
        isRequired
      />
    </div>
  );
};

export default ReleaseDateParams;
