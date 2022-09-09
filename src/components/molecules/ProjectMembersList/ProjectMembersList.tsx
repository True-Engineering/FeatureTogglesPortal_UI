import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { TextWithTooltip } from '@true-engineering/true-react-common-ui-kit';
import {
  AccountAvatar,
  IconButton,
  Dropdown,
  ContextPopup,
  Confirmation,
} from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { uniqArray } from '../../../utils';
import {
  IProjectMember,
  IEnvironmentId,
  IMemberProjectRole,
  IMemberEnvironmentRole,
  IUser,
  IProjectId,
} from '../../../types';
import { tableStyles } from '../../commonStyles';
import {
  styles,
  boldDropdownTweakStyles,
  deleteConfirmTweakStyles,
} from './ProjectMembersList.styles';
import {
  EnvironmentRoleDropdown,
  EnvironmentRoleButton,
} from '../EnvironmentRoleDropdown';

export interface IProjectMembersListProps {
  users: IProjectMember[];
  isEditable?: boolean;
  hasNameColumn?: boolean;
  onChangeProjectPermission?: (args: {
    user: IUser;
    projectId: IProjectId;
    projectRole: IMemberProjectRole;
  }) => void;
  onChangeEnvironmentPermission?: (args: {
    user: IUser;
    projectId: IProjectId;
    environmentId: IEnvironmentId;
    environmentRole: IMemberEnvironmentRole;
  }) => void;
  onDeleteUserFromProject?: (args: {
    user: IUser;
    projectId: IProjectId;
  }) => void;
}

const ProjectMembersList: FC<IProjectMembersListProps> = ({
  users,
  isEditable = false,
  hasNameColumn = true,
  onChangeProjectPermission,
  onChangeEnvironmentPermission,
  onDeleteUserFromProject,
}) => {
  const { classes: tableClasses } = useFeatureTogglesTheme(
    'tableStyles',
    tableStyles,
    {},
  );
  const { classes } = useFeatureTogglesTheme('ProjectMembersList', styles);
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isLeftScrollPosition, setIsLeftScrollPosition] = useState(true);
  const [isTopScrollPosition, setIsTopScrollPosition] = useState(true);

  const updateScrollPosition = (target: HTMLDivElement) => {
    const { scrollLeft, scrollTop } = target;
    setIsLeftScrollPosition(scrollLeft === 0);
    setIsTopScrollPosition(scrollTop === 0);
  };

  const convertProjectRoleToString = useCallback(
    (role?: IMemberProjectRole): string =>
      role === undefined ? t('empty') : t(`memberProjectRoles.${role}`),
    [],
  );

  if (users.length === 0) {
    return <div className={classes.empty}>{t('noMembers')}</div>;
  }

  const environmentsNames = uniqArray(
    users
      .map(({ environmentPermissions }) =>
        environmentPermissions.map(r => r.environment).flat(),
      )
      .flat(),
  );

  return (
    <div
      ref={rootRef}
      className={clsx(tableClasses.table, classes.root)}
      onScroll={e => updateScrollPosition(e.currentTarget)}
    >
      <div
        className={clsx(
          tableClasses.headRow,
          classes.rowScroll,
          classes.stickyHead,
          !isTopScrollPosition && classes.bottomShadow,
        )}
      >
        {hasNameColumn && (
          <div
            className={clsx(
              tableClasses.headCell,
              classes.boldHeadCell,
              classes.nameColumn,
              classes.nameCell,
              !isLeftScrollPosition && classes.rightShadow,
            )}
          >
            {t('name')}
          </div>
        )}
        <div
          className={clsx(
            tableClasses.headCell,
            classes.boldHeadCell,
            classes.projectColumn,
          )}
        >
          {t('entireProject')}
        </div>
        {environmentsNames.map(env => (
          <div
            key={env}
            className={clsx(
              tableClasses.headCell,
              classes.boldHeadCell,
              classes.permissionColumn,
            )}
          >
            <span title={env}>{env}</span>
          </div>
        ))}
        <div className={clsx(tableClasses.headCell, classes.actionsColumn)}>
          {isEditable && onDeleteUserFromProject !== undefined && (
            <div
              className={clsx(tableClasses.actionButton, classes.iconButton)}
            />
          )}
        </div>
      </div>
      {users.map(({ user, environmentPermissions, projectRole, projectId }) => {
        const { id: userId, userName, avatarUrl } = user;
        const rolesByEnv = Object.fromEntries(
          environmentPermissions.map(r => [r.environment, r]),
        );

        const isAdmin = projectRole === 'ADMIN';
        return (
          <div
            key={userId}
            className={clsx(tableClasses.row, classes.rowScroll)}
          >
            {hasNameColumn && (
              <div
                className={clsx(
                  tableClasses.cell,
                  classes.nameColumn,
                  classes.nameCell,
                  !isLeftScrollPosition && classes.rightShadow,
                )}
              >
                <AccountAvatar name={userName} avatarUrl={avatarUrl} />
                <div className={classes.userInfo}>
                  <div className={classes.userName} title={userName}>
                    {userName}
                  </div>
                </div>
              </div>
            )}
            <div
              className={clsx(
                tableClasses.cell,
                classes.projectColumn,
                classes.rightDivider,
              )}
            >
              {!isEditable || onChangeProjectPermission === undefined ? (
                <div className={classes.permissionText}>
                  {convertProjectRoleToString(projectRole)}
                </div>
              ) : (
                <div className={classes.permissionSelect}>
                  <Dropdown
                    value={projectRole}
                    tweakStyles={boldDropdownTweakStyles}
                    options={['MEMBER', 'ADMIN']}
                    onChange={newRole => {
                      if (newRole !== undefined) {
                        onChangeProjectPermission({
                          user,
                          projectRole: newRole,
                          projectId,
                        });
                      }
                    }}
                    convertValueToString={convertProjectRoleToString}
                  />
                </div>
              )}
            </div>
            {environmentsNames.map(k => {
              const { environmentId, environmentRole } = rolesByEnv[k];
              return (
                <div
                  key={environmentId}
                  className={clsx(tableClasses.cell, classes.permissionColumn)}
                >
                  {!isEditable ||
                  onChangeEnvironmentPermission === undefined ? (
                    <TextWithTooltip
                      tooltipText={t(
                        `memberEnvironmentRoles.${environmentRole}`,
                      )}
                    >
                      <div className={classes.roleButton}>
                        <EnvironmentRoleButton
                          testId={`button-role-${environmentId}`}
                          value={environmentRole}
                        />
                      </div>
                    </TextWithTooltip>
                  ) : (
                    <EnvironmentRoleDropdown
                      isDisabled={isAdmin}
                      value={environmentRole}
                      testId={`dropdown-env-role-${environmentId}`}
                      onChange={(newRole: IMemberEnvironmentRole) => {
                        onChangeEnvironmentPermission({
                          user,
                          environmentId,
                          environmentRole: newRole,
                          projectId,
                        });
                      }}
                    />
                  )}
                </div>
              );
            })}
            <div className={clsx(tableClasses.cell, classes.actionsColumn)}>
              {isEditable && onDeleteUserFromProject !== undefined && (
                <ContextPopup
                  tweakStyles={deleteConfirmTweakStyles}
                  popup={({ onClose }) => (
                    <Confirmation
                      onConfirm={() =>
                        onDeleteUserFromProject({
                          user,
                          projectId,
                        })
                      }
                      onCancel={() => onClose()}
                      message={t('confirmToDeleteProjectMember')}
                      buttonView="destructive"
                      buttonText={t('delete')}
                    />
                  )}
                >
                  {({ isOpen }) => (
                    <div
                      className={clsx(
                        !isOpen && tableClasses.actionButton,
                        classes.iconButton,
                      )}
                    >
                      <IconButton
                        testId="button-remove"
                        icon="trash-can"
                        isActive={isOpen}
                      />
                    </div>
                  )}
                </ContextPopup>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectMembersList;
