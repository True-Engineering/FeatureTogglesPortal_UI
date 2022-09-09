import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@true-engineering/true-react-common-ui-kit';
import { INestedErrorsResult } from '@true-engineering/true-react-common-validator';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { getErrorMessageFunction, hasError } from '../../../../../utils';
import { IAppVersionStrategyParams } from '../../../../../types';
import { styles } from './AppVersionParams.styles';

export interface IAppVersionParams {
  params?: IAppVersionStrategyParams;
  onChange: (params?: IAppVersionStrategyParams) => void;
  errors?: INestedErrorsResult<IAppVersionStrategyParams>;
}

const AppVersionParams: FC<IAppVersionParams> = ({
  params = {},
  errors,
  onChange,
}) => {
  const { classes } = useFeatureTogglesTheme('AppVersionParams', styles, {});
  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [isTouched, setIsTouched] = useState(false);

  return (
    <div className={classes.root}>
      <Input
        label={t('appVersion')}
        value={params.appVersion}
        onChange={v => onChange({ appVersion: v })}
        onBlur={() => setIsTouched(true)}
        isInvalid={hasError(errors?.appVersion) && isTouched}
        errorMessage={getErrorMessage(errors?.appVersion)}
        isRequired
      />
    </div>
  );
};

export default AppVersionParams;
