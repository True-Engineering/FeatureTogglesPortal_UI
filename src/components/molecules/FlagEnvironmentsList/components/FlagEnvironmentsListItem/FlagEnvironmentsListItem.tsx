import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Switch } from '@true-engineering/true-react-common-ui-kit';
import {
  IconButton,
  FlippingStrategyParamsList,
  PermissionController,
  ComponentWithTooltip,
} from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { getDateFnsLocale, hasPermissions } from '../../../../../utils';
import { LONG_DATE_TIME_FORMAT } from '../../../../../constants';
import {
  IFlagEnvironment,
  IFlag,
  IProjectEnvironment,
  IFlagState,
  ILocale,
} from '../../../../../types';
import { tableStyles } from '../../../../commonStyles';
import { styles } from '../../FlagEnvironmentsList.styles';

export interface IFreezingInfo {
  freezingEnable?: IProjectEnvironment['freezingEnable'];
  freezingEndTime?: IProjectEnvironment['freezingEndTime'];
}

export interface IFlagEnvironmentsListItemProps {
  flag: IFlag;
  environment: IFlagEnvironment;
  freezingInfo?: IFreezingInfo;
  onSwitchChange: (flagState: IFlagState) => void;
  onEdit: (flag: IFlag, environment: IFlagEnvironment) => void;
}

const FlagEnvironmentsListItem: FC<IFlagEnvironmentsListItemProps> = ({
  flag,
  environment,
  environment: { name, flippingStrategy, isEnabled, permissions },
  freezingInfo,
  onSwitchChange,
  onEdit,
}) => {
  const { t, i18n } = useTranslation();
  const dateFnsLocale = getDateFnsLocale(i18n.language as ILocale);

  const { classes } = useFeatureTogglesTheme('FlagEnvironmentsList', styles);
  const { classes: tableClasses } = useFeatureTogglesTheme(
    'tableStyles',
    tableStyles,
    {},
  );

  const isSwitchDisabled =
    !hasPermissions(permissions, 'EDIT') || freezingInfo?.freezingEnable;

  return (
    <div className={tableClasses.row}>
      <div
        className={clsx(
          tableClasses.cell,
          classes.nameColumn,
          classes.nameCell,
        )}
      >
        {name}
      </div>
      <div className={clsx(tableClasses.cell, classes.strategyColumn)}>
        <FlippingStrategyParamsList strategy={flippingStrategy} />
      </div>
      <div className={clsx(tableClasses.cell, classes.flagStateColumn)}>
        <div
          className={classes.flagStateContent}
          onClick={event => event.stopPropagation()}
        >
          <ComponentWithTooltip
            tooltipProps={{
              text: t('freezeFeatureFlags.freezeNotificationShort', {
                time:
                  freezingInfo?.freezingEndTime !== undefined &&
                  format(freezingInfo?.freezingEndTime, LONG_DATE_TIME_FORMAT, {
                    locale: dateFnsLocale,
                  }),
              }),
              view: 'hint',
            }}
            shouldShowTooltip={freezingInfo?.freezingEnable}
          >
            <Switch
              value={name}
              isChecked={isEnabled}
              isDisabled={isSwitchDisabled}
              onChange={event =>
                onSwitchChange({
                  flag,
                  environment,
                  isEnabled: event.isEnabled,
                })
              }
            />
          </ComponentWithTooltip>
          <PermissionController permissions={permissions} allow="EDIT">
            <div
              className={clsx(tableClasses.actionButton, classes.iconButton)}
            >
              <IconButton
                icon="pencil"
                onClick={event => {
                  event.stopPropagation();
                  onEdit(flag, environment);
                }}
              />
            </div>
          </PermissionController>
        </div>
      </div>
    </div>
  );
};

export default FlagEnvironmentsListItem;
