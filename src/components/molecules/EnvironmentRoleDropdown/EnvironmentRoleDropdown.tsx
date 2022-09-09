import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, List } from '@true-engineering/true-react-common-ui-kit';
import { ContextPopup, IconButton, IIconButtonProps } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { IMemberEnvironmentRole } from '../../../types';
import {
  styles,
  secondIconButtonTweakStyles,
} from './EnvironmentRoleDropdown.styles';

export interface IEnvironmentRoleDropdownProps {
  value: IMemberEnvironmentRole;
  isDisabled: boolean;
  testId?: string;
  onChange: (value: IMemberEnvironmentRole) => void;
}

const EnvironmentRoleDropdown: FC<IEnvironmentRoleDropdownProps> = ({
  value,
  isDisabled,
  onChange,
  testId,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'EnvironmentRoleDropdown',
    styles,
    {},
  );
  const { t } = useTranslation();

  return (
    <ContextPopup
      placement="bottom-start"
      hasWrapperStyle={false}
      isDisabled={isDisabled}
      popup={({ onClose }) => (
        <List
          items={[
            {
              item: t('memberEnvironmentRoles.EDITOR'),
              icon: (
                <div className={classes.mainIcon}>
                  <Icon type="pencil" />
                </div>
              ),
              onClick: () => {
                onChange('EDITOR');
                onClose();
              },
            },
            {
              item: t('memberEnvironmentRoles.VIEWER'),
              icon: (
                <div className={classes.secondIcon}>
                  <Icon type="eye" />
                </div>
              ),
              onClick: () => {
                onChange('VIEWER');
                onClose();
              },
            },
            {
              item: t('memberEnvironmentRoles.NO_ACCESS'),
              icon: (
                <div className={classes.cancelIcon}>
                  <Icon type="lock" />
                </div>
              ),
              onClick: () => {
                onChange('NO_ACCESS');
                onClose();
              },
            },
          ]}
        />
      )}
    >
      {({ isOpen }) => (
        <div key={value}>
          <EnvironmentRoleButton
            value={value}
            isActive={isOpen}
            isDisabled={isDisabled}
            testId={testId}
          />
        </div>
      )}
    </ContextPopup>
  );
};

interface IEnvironmentRoleButtonProps
  extends Omit<IIconButtonProps, 'view' | 'icon' | 'tweakStyles'> {
  value: IMemberEnvironmentRole;
}

export const EnvironmentRoleButton: FC<IEnvironmentRoleButtonProps> = ({
  value,
  ...props
}) =>
  value === 'VIEWER' ? (
    <IconButton
      view="main"
      icon="eye"
      tweakStyles={secondIconButtonTweakStyles}
      {...props}
    />
  ) : value === 'EDITOR' ? (
    <IconButton view="main" icon="pencil" {...props} />
  ) : (
    <IconButton view="cancel" icon="lock" {...props} />
  );

export default EnvironmentRoleDropdown;
