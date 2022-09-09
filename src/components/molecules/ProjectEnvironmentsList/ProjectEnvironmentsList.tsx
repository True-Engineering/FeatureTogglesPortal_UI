import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Icon,
  IListItem,
  MoreMenu,
} from '@true-engineering/true-react-common-ui-kit';
import { NotificationSettingsModal } from './components';
import {
  Confirmation,
  ITextWithStatusProps,
  LinkButton,
  TextWithStatus,
  ContextPopup,
  PermissionController,
} from '../../atoms';
import {
  IEditableProjectEnvironment,
  EditProjectEnvironmentForm,
  EnvironmentInstancesList,
} from '../../molecules';
import { useFeatureTogglesTheme } from '../../../hooks';
import { sortById, hasPermissions } from '../../../utils';
import {
  IEnvironmentId,
  IEnvironmentPermission,
  IProject,
  IProjectEnvironment,
  IProjectEnvironmentInstance,
  IProjectEnvironmentStatus,
  IProjectId,
} from '../../../types';
import { tableStyles } from '../../commonStyles';
import {
  styles,
  instancesMenuTweakStyles,
  tokenMenuTweakStyles,
} from './ProjectEnvironmentsList.styles';
import { IS_EDIT_NOTIFICATIONS_ENABLED } from '../../../feature-flags';

export interface IProjectEnvironmentsListProps {
  project: IProject;
  onEditProjectEnvironment: (args: {
    projectId: IProjectId;
    environment: IEditableProjectEnvironment & { id: IEnvironmentId };
  }) => void;
  onCreateProjectEnvironment?: (args: {
    projectId: IProjectId;
    environment: IEditableProjectEnvironment;
  }) => void;
  onDeleteProjectEnvironment?: (args: {
    projectId: IProjectId;
    environment: IProjectEnvironment;
  }) => void;
  onUpdateToken: (args: {
    projectId: IProjectId;
    environment: IProjectEnvironment;
  }) => void;
  onDeleteEnvironmentInstance: (args: {
    projectId: IProjectId;
    environmentId: IEnvironmentId;
    instance: IProjectEnvironmentInstance;
  }) => void;
  onUpdateList: () => Promise<void>;
}

const statusColors: Record<
  IProjectEnvironmentStatus,
  ITextWithStatusProps['color']
> = {
  ACTIVE: 'green',
  OUT_OF_SYNC: 'grey',
  UNAVAILABLE: 'red',
  NOT_CONNECTED: 'orange',
};

const ProjectEnvironmentsList: FC<IProjectEnvironmentsListProps> = ({
  project: { environments, id: projectId },
  onEditProjectEnvironment,
  onCreateProjectEnvironment,
  onDeleteProjectEnvironment,
  onUpdateToken,
  onDeleteEnvironmentInstance,
  onUpdateList,
}) => {
  const { t } = useTranslation();
  const { classes } = useFeatureTogglesTheme('ProjectEnvironmentsList', styles);
  const { classes: tableClasses } = useFeatureTogglesTheme(
    'tableStyles',
    tableStyles,
    {},
  );

  const sortedEnvironments = useMemo(() => sortById(environments), [
    environments,
  ]);

  const [tokenMenu, setTokenMenu] = useState<IEnvironmentId | undefined>();
  const [isNewEnvironmentOpen, setIsNewEnvironmentOpen] = useState(false);
  const [editableEnvironmentIds, setEditableEnvironmentIds] = useState<
    IEnvironmentId[]
  >([]);
  const [
    notificationSettingsModalState,
    setNotificationSettingsModalState,
  ] = useState<{
    id?: number;
    name?: string;
    emails: Array<{ email: string }>;
    permissions: IEnvironmentPermission[];
    isOpen: boolean;
  }>({
    id: undefined,
    name: undefined,
    emails: [],
    permissions: [],
    isOpen: false,
  });

  const handleOpenNotificationSettingsModal = (
    id: number,
    name: string,
    emails: Array<{ email: string }>,
    permissions: IEnvironmentPermission[],
  ) => {
    setNotificationSettingsModalState({
      id,
      name,
      emails,
      permissions,
      isOpen: true,
    });
  };

  const handleCloseNotificationSettingsModal = () => {
    setNotificationSettingsModalState(prevState => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const onOpenEditEnvironmentForm = (envId: IEnvironmentId) => {
    setEditableEnvironmentIds(prevValues => [...prevValues, envId]);
  };

  const onCloseEditEnvironmentForm = (envId: IEnvironmentId) => {
    setEditableEnvironmentIds(prevValues =>
      prevValues.filter(id => id !== envId),
    );
  };

  if (
    sortedEnvironments.length === 0 &&
    onCreateProjectEnvironment === undefined
  ) {
    return (
      <div className={classes.empty}>{t('emptyProjectEnvironmentsList')}</div>
    );
  }

  return (
    <div
      className={clsx(tableClasses.table, tableClasses.shadow, classes.root)}
    >
      {sortedEnvironments.length > 0 && (
        <div className={tableClasses.headRow}>
          <div className={clsx(tableClasses.headCell, classes.nameColumn)}>
            {t('environment')}
          </div>
          <div className={clsx(tableClasses.headCell, classes.tokenColumn)}>
            {t('token')}
          </div>
          <div
            className={clsx(
              tableClasses.headCell,
              classes.connectionStatusColumn,
            )}
          >
            {t('connectionStatus')}
          </div>
          <div className={clsx(tableClasses.headCell, classes.instancesColumn)}>
            {t('agents')}
          </div>
          <div className={clsx(tableClasses.headCell, classes.actionsColumn)} />
        </div>
      )}
      {sortedEnvironments.map(environment => {
        const {
          name: environmentName,
          id: environmentId,
          authKeyExist: isAuthKeyExist,
          instances,
          status,
          permissions,
          emails,
        } = environment;

        const menu: IListItem[] = [];
        if (hasPermissions(permissions, 'EDIT')) {
          menu.push({
            item: 'Редактировать название',
            icon: 'pencil',
            onClick: () => onOpenEditEnvironmentForm(environmentId),
          });
        }
        if (IS_EDIT_NOTIFICATIONS_ENABLED) {
          menu.push({
            item: 'Настройка уведомлений',
            icon: 'settings',
            onClick: () =>
              handleOpenNotificationSettingsModal(
                environmentId,
                environmentName,
                emails ?? [],
                permissions,
              ),
          });
        }

        const instancesCount = instances.length;

        return (
          <div key={environmentName} className={tableClasses.row}>
            {editableEnvironmentIds.includes(environmentId) ? (
              <div
                className={clsx(
                  tableClasses.cell,
                  classes.cellWithEnvironmentForm,
                )}
              >
                <EditProjectEnvironmentForm
                  initialValues={{ name: environmentName }}
                  onSubmit={(values: IEditableProjectEnvironment) => {
                    onCloseEditEnvironmentForm(environmentId);
                    onEditProjectEnvironment({
                      projectId,
                      environment: {
                        ...values,
                        id: environmentId,
                      },
                    });
                  }}
                  onCancel={() => {
                    onCloseEditEnvironmentForm(environmentId);
                  }}
                  onDelete={
                    onDeleteProjectEnvironment === undefined ||
                    !permissions.includes('DELETE')
                      ? undefined
                      : () => {
                          onCloseEditEnvironmentForm(environmentId);
                          onDeleteProjectEnvironment({
                            projectId,
                            environment,
                          });
                        }
                  }
                />
              </div>
            ) : (
              <>
                <div
                  className={clsx(
                    tableClasses.cell,
                    classes.nameColumn,
                    classes.nameCell,
                  )}
                >
                  {environmentName}
                </div>
                <div className={clsx(tableClasses.cell, classes.tokenColumn)}>
                  <div className={classes.tokenCell}>
                    {isAuthKeyExist ? (
                      <div className={classes.checkIcon}>
                        <Icon type="check" />
                      </div>
                    ) : (
                      <div className={classes.minusIcon}>
                        <Icon type="minus" />
                      </div>
                    )}

                    <PermissionController
                      permissions={permissions}
                      allow="EDIT"
                    >
                      <div
                        className={clsx(
                          classes.tokenUpdateButton,
                          environmentId !== tokenMenu &&
                            tableClasses.actionButton,
                        )}
                      >
                        {isAuthKeyExist ? (
                          <ContextPopup
                            tweakStyles={tokenMenuTweakStyles}
                            onOpen={() => setTokenMenu(environmentId)}
                            onClose={() => setTokenMenu(undefined)}
                            popup={({ onClose }: { onClose: () => void }) => (
                              <Confirmation
                                message={t('confirmToUpdateToken')}
                                onConfirm={() => {
                                  onClose();
                                  onUpdateToken({ projectId, environment });
                                }}
                                onCancel={() => {
                                  onClose();
                                }}
                              />
                            )}
                          >
                            {({ isOpen }) => (
                              <LinkButton
                                size="small"
                                text={t('refreshToken')}
                                isActive={isOpen}
                              />
                            )}
                          </ContextPopup>
                        ) : (
                          <LinkButton
                            size="small"
                            text={t('addToken')}
                            onClick={() => {
                              onUpdateToken({ projectId, environment });
                            }}
                          />
                        )}
                      </div>
                    </PermissionController>
                  </div>
                </div>
                <div
                  className={clsx(
                    tableClasses.cell,
                    classes.connectionStatusColumn,
                  )}
                >
                  <TextWithStatus
                    color={statusColors[status]}
                    text={t(`environmentStatus.${status}`)}
                  />
                </div>
                <div
                  className={clsx(tableClasses.cell, classes.instancesColumn)}
                >
                  {instancesCount === 0 ? (
                    <div className={classes.minusIcon}>
                      <Icon type="minus" />
                    </div>
                  ) : (
                    <ContextPopup
                      hasCloseButton
                      tweakStyles={instancesMenuTweakStyles}
                      popup={() => (
                        <div className={classes.instancesMenu}>
                          <div className={classes.contextMenuHeader}>
                            {t('agents')}
                          </div>
                          <div className={classes.instancesList}>
                            <EnvironmentInstancesList
                              instances={instances}
                              onDeleteEnvironmentInstance={
                                permissions.includes('EDIT')
                                  ? (instance: IProjectEnvironmentInstance) =>
                                      onDeleteEnvironmentInstance({
                                        projectId,
                                        environmentId,
                                        instance,
                                      })
                                  : undefined
                              }
                            />
                          </div>
                        </div>
                      )}
                    >
                      {({ isOpen }) => (
                        <LinkButton
                          size="small"
                          text={`${instancesCount} ${t('agent', {
                            count: instancesCount,
                          }).toLowerCase()}`}
                          isActive={isOpen}
                        />
                      )}
                    </ContextPopup>
                  )}
                </div>
                {menu.length > 0 && (
                  <div
                    className={clsx(
                      tableClasses.cell,
                      classes.actionsColumn,
                      tableClasses.actionButton,
                    )}
                  >
                    <MoreMenu items={menu} />
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}

      {onCreateProjectEnvironment !== undefined && (
        <div className={tableClasses.footerRow}>
          <div
            className={clsx(tableClasses.cell, classes.cellWithEnvironmentForm)}
          >
            {isNewEnvironmentOpen ? (
              <EditProjectEnvironmentForm
                onSubmit={(values: IEditableProjectEnvironment) => {
                  onCreateProjectEnvironment({
                    projectId,
                    environment: values,
                  });
                  setIsNewEnvironmentOpen(false);
                }}
                onCancel={() => setIsNewEnvironmentOpen(false)}
              />
            ) : (
              <LinkButton
                icon="plus"
                hasCircleUnderIcon
                isBold
                text={t('addEnvironment')}
                size="small"
                onClick={() => setIsNewEnvironmentOpen(true)}
              />
            )}
          </div>
        </div>
      )}

      <NotificationSettingsModal
        projectId={projectId}
        emails={notificationSettingsModalState.emails}
        name={notificationSettingsModalState.name}
        isOpen={notificationSettingsModalState.isOpen}
        environmentId={notificationSettingsModalState.id}
        permissions={notificationSettingsModalState.permissions}
        onClose={handleCloseNotificationSettingsModal}
        onSubmit={onUpdateList}
      />
    </div>
  );
};

export default ProjectEnvironmentsList;
