import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumberInput } from '@true-engineering/true-react-common-ui-kit';
import { INestedErrorsResult } from '@true-engineering/true-react-common-validator';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { hasError, getErrorMessageFunction } from '../../../../../utils';
import { IDarkLaunchStrategyParams } from '../../../../../types';
import { styles } from './DarkLaunchParams.styles';

export interface IDarkLaunchParams {
  params?: IDarkLaunchStrategyParams;
  onChange: (params?: IDarkLaunchStrategyParams) => void;
  errors?: INestedErrorsResult<IDarkLaunchStrategyParams>;
}

const DarkLaunchParams: FC<IDarkLaunchParams> = ({
  params = {},
  errors,
  onChange,
}) => {
  const { classes } = useFeatureTogglesTheme('DarkLaunchParams', styles, {});
  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [isTouched, setIsTouched] = useState(false);

  return (
    <div className={classes.root}>
      <NumberInput
        canBeFloat
        precision={1}
        label={t('probability')}
        value={params?.weight}
        onChange={v => {
          onChange(v === undefined ? undefined : { weight: v });
        }}
        onBlur={() => setIsTouched(true)}
        isInvalid={hasError(errors?.weight) && isTouched}
        errorMessage={getErrorMessage(errors?.weight)}
        isRequired
      />
    </div>
  );
};

export default DarkLaunchParams;
