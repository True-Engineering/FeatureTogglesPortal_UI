import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@true-engineering/true-react-common-ui-kit';
import { ProjectUniqueIcon } from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import {
  convertEnvironmentToString,
  hasPermissions,
} from '../../../../../utils';
import {
  IFormValuesChangeHandler,
  IProjectEnvironment,
} from '../../../../../types';
import { IEnvironmentsCompareFields } from '../../types';
import { styles } from './Header.styles';

export interface IHeaderProps {
  values: IEnvironmentsCompareFields;
  environments: IProjectEnvironment[];
  areEnvironmentsLoading: boolean;
  isDisabled: boolean;
  onChange: IFormValuesChangeHandler<IEnvironmentsCompareFields>;
  onSwap: () => void;
}

export const Header: FC<IHeaderProps> = ({
  values,
  environments,
  areEnvironmentsLoading,
  isDisabled,
  onChange,
  onSwap,
}) => {
  const { t } = useTranslation();
  const { classes } = useFeatureTogglesTheme(
    'EnvironmentsCompareModalHeader',
    styles,
    {},
  );

  const fromOptions = useMemo(
    () => environments.filter(env => env.id !== values.to?.id),
    [environments, values.to?.id],
  );

  const toOptions = useMemo(
    () =>
      environments.filter(
        env =>
          env.id !== values.from?.id && hasPermissions(env.permissions, 'EDIT'),
      ),
    [environments, values.from?.id],
  );

  const isSwapButtonDisabled =
    values.from !== undefined &&
    values.to !== undefined &&
    !hasPermissions(values.from.permissions, 'EDIT');

  return (
    <div className={classes.header}>
      <Select
        label={t('fromEnvironment')}
        placeholder={t('fromEnvironment')}
        inlineStyle="left"
        options={fromOptions}
        value={values.from}
        onChange={onChange('from')}
        convertValueToString={convertEnvironmentToString}
        isDisabled={isDisabled}
        isLoading={areEnvironmentsLoading}
        hasFloatingLabel
      />
      <button
        className={classes.swap}
        onClick={onSwap}
        disabled={isSwapButtonDisabled}
      >
        <div className={classes.swapIcon}>
          <ProjectUniqueIcon type="swap" />
        </div>
      </button>
      <Select
        label={t('toEnvironment')}
        placeholder={t('toEnvironment')}
        options={toOptions}
        value={values.to}
        noMatchesLabel={t('compareModal.noEnvironments')}
        onChange={onChange('to')}
        convertValueToString={convertEnvironmentToString}
        hasFloatingLabel
        isDisabled={isDisabled}
        isLoading={areEnvironmentsLoading}
        inlineStyle="right"
      />
    </div>
  );
};
