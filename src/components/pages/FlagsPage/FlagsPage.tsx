import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { observer } from 'mobx-react-lite';
import {
  Switch,
  useIsMounted,
  ToasterType,
  Button,
  MoreMenu,
  IMoreMenuProps,
  ThemedPreloader,
} from '@true-engineering/true-react-common-ui-kit';
import {
  EmptyContentMessage,
  Divider,
  LinkButton,
  PermissionController,
  Title,
  ProjectUniqueIcon,
  FreezeNotification,
} from '../../atoms';
import {
  EnableFreezeFeatureFlagsForm,
  DisableFreezeFeatureFlagsModalContent,
} from '../../molecules';
import {
  EditFlagForm,
  FlagsTable,
  EditFlippingStrategyForm,
  PageHeader,
  PageFooter,
  SyncEnvironmentsForm,
  SyncPortalsForm,
  HistoryOfChanges,
  EnvironmentsCompareModal,
} from '../../organisms';
import {
  useApi,
  useStore,
  useRoutes,
  useFeatureTogglesTheme,
} from '../../../hooks';
import {
  checkIsOrganizationExist,
  checkIsProjectExist,
  sortById,
  uniqArray,
  hasPermissions,
} from '../../../utils';
import {
  EXPORT_FLAGS_FILENAME,
  FLAGS_FILE_EXTENSIONS,
} from '../../../constants';
import {
  IEnvironmentId,
  IFlag,
  IFlagEnvironment,
  IFlagState,
  IFlippingStrategy,
  IProjectEnvironment,
  IProjectId,
  ISyncEnvironmentsInfo,
  ISyncPortalsInfo,
} from '../../../types';
import { modalTweakStyles } from '../../commonStyles';
import {
  styles,
  modalWithoutPaddingTweakStyles,
  membersButtonTweakStyles,
  moreMenuTweakStyles,
  historyOfChangesModalTweakStyles,
  historyOfChangesButtonTweakStyles,
} from './FlagsPage.styles';

const FlagsPage: React.FC = () => {
  const { classes } = useFeatureTogglesTheme('FlagsPage', styles, {});

  const { t } = useTranslation();
  const { params, routes, changeLocation } = useRoutes<'projectPage'>();

  const api = useApi();
  const isMounted = useIsMounted();

  const [isLoading, setIsLoading] = useState(true);
  const [flags, setFlags] = useState<IFlag[]>([]);
  const [editableFlagName, setEditableFlagName] = useState<
    string | undefined
  >();
  const [isGroupView, setIsGroupView] = useState(false);
  const syncEnvironmentsInputRef = useRef<HTMLInputElement>(null);
  const syncPortalsInputRef = useRef<HTMLInputElement>(null);
  const [
    isEnvironmentsCompareModalOpen,
    setIsEnvironmentsCompareModalOpen,
  ] = useState(false);

  const {
    currentOrganization,
    techStore: { fetchWithToaster, addModal, closeLastModal },
    findProjectById,
    findDefaultProject,
    refreshProject,
  } = useStore();

  const rawProjectId: IProjectId | undefined =
    params.projectId === undefined ? undefined : parseInt(params.projectId, 10);

  const sortedProjects =
    currentOrganization === undefined
      ? []
      : sortById(currentOrganization.projects);

  // Тут может быть undefined
  const project =
    findProjectById(rawProjectId) ?? findDefaultProject() ?? sortedProjects[0];

  /** Эта страница у нас находится адресу "/". Когда человек только зарегистрировался,
   * возникает ситуация, когда список проектов пуст. В таком случае project = undefined. Переадресация на страницу проектов для случая, когда данных организации нет,
   * срабатывает внутри loadFlags(), который вызывается в useEffect. useEffect срабатывает после монтирования компонента, поэтому страница крашится,
   * в местах, где мы пытаемся что то достать из project, который undefined
   * TODO: реализовать другое решение, например, в react-router-dom есть компонент <Navigate/>,
   * который можно было бы возвращать, сразу после инициализации project, если в переменной лежит undefined
   */
  useEffect(() => {
    loadFlags();
  }, [rawProjectId]);

  const openModalWithEditFlagForm = (flagName?: string) => {
    const editableFlag = flags.find(flag => flag.name === flagName);

    const isNewFlag = editableFlag === undefined;
    const canDelete =
      project !== undefined &&
      hasPermissions(project.permissions, 'DELETE_FLAG');

    const groupsList = uniqArray(flags.map(f => f.group)).filter(
      g => g !== undefined && g !== '',
    ) as string[];

    const tagsList = uniqArray(flags.map(f => f.tag)).filter(
      g => g !== undefined,
    ) as string[];

    addModal({
      tweakStyles: modalTweakStyles,
      size: 'm',
      hasCloseButton: false,
      children: (
        <EditFlagForm
          initialFlag={editableFlag}
          groupsList={groupsList}
          tagsList={tagsList}
          isNewFlag={isNewFlag}
          onCancel={handleCloseModal}
          onDelete={canDelete ? handleDeleteFlag : undefined}
          onSaveChanges={isNewFlag ? handleCreateFlag : handleEditFlag}
        />
      ),
    });

    if (flagName !== undefined) {
      setEditableFlagName(flagName);
    }
  };

  const openModalWithEditStrategyForm = (
    flag: IFlag,
    environment: IFlagEnvironment,
  ) => {
    addModal({
      tweakStyles: modalTweakStyles,
      size: 'm',
      hasCloseButton: false,
      children: (
        <EditFlippingStrategyForm
          environmentName={environment.name}
          initialStrategy={environment.flippingStrategy}
          onCancel={handleCloseModal}
          onSaveChanges={(flippingStrategy?: IFlippingStrategy) => {
            handleEditFlagStrategy(flag, environment.id, flippingStrategy);
          }}
        />
      ),
    });

    setEditableFlagName(flag.name);
  };

  const handleCreateFlag = async (flag: IFlag) => {
    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    fetchWithToaster({
      fetch: async () => {
        const body = {
          organizationId: currentOrganization.id,
          projectId: project.id,
          flag,
        };

        const newFlagState = await api.createFlag(body);
        await addFlagState(newFlagState);
      },

      successMessage: t('successCreatedFlag'),
      errorMessage: t('failedToCreateFlag'),
    });

    handleCloseModal();
  };

  const handleEditFlag = async (flag: IFlag) => {
    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    fetchWithToaster({
      fetch: async () => {
        const body = {
          organizationId: currentOrganization.id,
          projectId: project.id,
          flag,
        };

        const updatedFlagState = await api.editFlag(body);
        await updateFlagState(updatedFlagState);
      },

      successMessage: t('successChangedFlag'),
      errorMessage: t('failedToChangeFlag'),
    });

    handleCloseModal();
  };

  const handleEditFlagStrategy = async (
    flag: IFlag,
    environmentId: IEnvironmentId,
    flippingStrategy?: IFlippingStrategy,
  ) => {
    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    const flagName = flag.name;
    fetchWithToaster({
      fetch: async () => {
        const body = {
          organizationId: currentOrganization.id,
          projectId: project.id,
          flagName,
          environmentId,
          flippingStrategy,
        };

        const newFlagState = await api.editFlagStrategy(body);
        await updateFlagState(newFlagState);
      },

      successMessage: t('successChangedFlag'),
      errorMessage: t('failedToChangeFlag'),
    });

    handleCloseModal();
  };

  const handleDeleteFlag = async (flag: IFlag) => {
    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    const flagName = flag.name;
    fetchWithToaster({
      fetch: async () => {
        await api.deleteFlag({
          organizationId: currentOrganization.id,
          projectId: project.id,
          flagName,
        });
        await loadFlags();
      },
      successMessage: t('successDeletedFlag'),
      errorMessage: t('failedToDeleteFlag'),
    });

    handleCloseModal();
  };

  const updateFlagState = (newFlagState: IFlag) => {
    setFlags(prevFlags =>
      prevFlags.map(flag =>
        flag.name === newFlagState.name ? newFlagState : flag,
      ),
    );
  };

  const addFlagState = (newFlagState: IFlag) => {
    setFlags(prevFlags => [...prevFlags, newFlagState]);
  };

  const handleCloseModal = () => {
    if (isMounted()) {
      closeLastModal();
      setEditableFlagName(undefined);
    }
  };

  const handleFlagStateChange = async ({
    flag,
    isEnabled,
    environment,
  }: IFlagState) => {
    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    const successMessage = isEnabled
      ? t('successEnabledFlag')
      : t('successDisabledFlag');
    const errorMessage = isEnabled
      ? t('failedToEnableFlag')
      : t('failedToDisableFlag');
    const toasterType: ToasterType = isEnabled ? 'ok' : 'info';

    const toggleFlag = isEnabled ? api.enableFlag : api.disableFlag;

    fetchWithToaster({
      fetch: async () => {
        await toggleFlag({
          organizationId: currentOrganization.id,
          projectId: project.id,
          flagName: flag.name,
          environmentId: environment.id,
        });

        updateFlagState({
          ...flag,
          environments: flag.environments.map(env =>
            env.id === environment.id ? { ...env, isEnabled } : env,
          ),
        });
      },

      successMessage,
      errorMessage,
      toasterType,
    });
  };

  const loadFlags = async () => {
    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      changeLocation(routes.projectsPage.getUrl());
      return;
    }

    setIsLoading(true);

    const loadedFlags = await api.loadFlags({
      organizationId: currentOrganization.id,
      projectId: project.id,
    });

    if (isMounted()) {
      setFlags(loadedFlags);
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    fetchWithToaster({
      fetch: async () => {
        const response = await api.downloadFlagsFile({
          organizationId: currentOrganization.id,
          projectId: project.id,
        });
        saveAs(response, EXPORT_FLAGS_FILENAME);
      },
      errorMessage: t('failedToExportFlagsFile'),
    });
  };

  const handleSyncEnvironments = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      console.error('no file for import');
      return;
    }

    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    let syncEnvironmentsInfo: ISyncEnvironmentsInfo | undefined;

    await fetchWithToaster({
      fetch: async () => {
        syncEnvironmentsInfo = await api.fetchSyncEnvironmentsInfo({
          organizationId: currentOrganization.id,
          projectId: project.id,
          file,
        });
      },
      errorMessage: t('failedToSyncEnvironments'),
    });
    if (!syncEnvironmentsInfo) {
      console.error('no info about environments synchronization');
      return;
    }

    addModal({
      tweakStyles: modalTweakStyles,
      size: 'm',
      hasCloseButton: false,
      children: (
        <SyncEnvironmentsForm
          info={syncEnvironmentsInfo}
          onSync={async ({ fileKey, src, dest }) => {
            await fetchWithToaster({
              fetch: async () => {
                const newFlags = await api.fetchSyncEnvironmentsUpload({
                  organizationId: currentOrganization.id,
                  projectId: project.id,
                  fileKey,
                  src,
                  dest,
                });

                setFlags(newFlags);
              },
              successMessage: t('successSyncEnvironments'),
              errorMessage: t('failedToSyncEnvironments'),
            });

            closeLastModal();
          }}
          onCancel={() => {
            closeLastModal();
          }}
          onOpenSyncPortal={() => {
            closeLastModal();
            handleSyncPortals(event);
          }}
        />
      ),
    });
  };

  const handleSyncPortals = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      console.error('no file for import');
      return;
    }

    if (
      !checkIsOrganizationExist(currentOrganization) ||
      !checkIsProjectExist(project)
    ) {
      return;
    }

    let syncPortalInfo: ISyncPortalsInfo | undefined;

    await fetchWithToaster({
      fetch: async () => {
        syncPortalInfo = await api.fetchSyncPortalsInfo({
          organizationId: currentOrganization.id,
          projectId: project.id,
          file,
        });
      },
      errorMessage: t('failedToSyncPortals'),
    });

    if (!syncPortalInfo) {
      console.error('no info about portals synchronization');
      return;
    }

    addModal({
      tweakStyles: modalWithoutPaddingTweakStyles,
      size: 'm',
      hasCloseButton: false,
      children: (
        <SyncPortalsForm
          info={syncPortalInfo}
          onSync={async ({ fileKey, shouldBeRemoved }) => {
            await fetchWithToaster({
              fetch: async () => {
                const newFlags = await api.fetchSyncPortalsUpload({
                  organizationId: currentOrganization.id,
                  projectId: project.id,
                  fileKey,
                  shouldBeRemoved,
                });

                setFlags(newFlags);
              },
              successMessage: t('successSyncPortals'),
              errorMessage: t('failedToSyncPortals'),
            });

            closeLastModal();
          }}
          onCancel={() => {
            closeLastModal();
          }}
        />
      ),
    });
  };

  const openCompareEnvironmentsModal = () => {
    setIsEnvironmentsCompareModalOpen(true);
  };

  const closeCompareEnvironmentsModal = () => {
    setIsEnvironmentsCompareModalOpen(false);
  };

  const finishCompareEnvironments = async () => {
    closeCompareEnvironmentsModal();
    await loadFlags();
  };

  const openModalWithHistoryOfChanges = () => {
    addModal({
      position: 'right',
      tweakStyles: historyOfChangesModalTweakStyles,
      children: (
        <HistoryOfChanges
          projectId={project.id}
          organizationId={currentOrganization?.id}
        />
      ),
    });
  };

  const frozenEnvironmentsData = project?.environments.filter(
    ({ freezingEnable }) => freezingEnable,
  );
  const isSomeEnvironmentFrozen = frozenEnvironmentsData?.length > 0;

  const handleFreezeFeatureFlagsOnEnvironment = async (
    environment: IProjectEnvironment,
    endTime: Date,
  ) => {
    if (!checkIsProjectExist(project)) {
      console.error(
        "Feature Flags can't be frozen because params are incorrect",
      );
      return;
    }

    const { id: environmentId, name } = environment;
    const { id: projectId } = project;

    await fetchWithToaster({
      fetch: () =>
        api.freezeFeatureFlags({
          environmentId,
          projectId,
          endTime,
        }),
      successMessage: t('freezeFeatureFlags.fetchFreezeSuccessMessage', {
        name,
      }),
      errorMessage: t('freezeFeatureFlags.fetchFreezeErrorMessage', {
        name,
      }),
    });

    await refreshProject(projectId);
  };

  const openModalWithEnableFreezeFeatureFlagsForm = () =>
    addModal({
      hasCloseButton: false,
      children: (
        <EnableFreezeFeatureFlagsForm
          data={project.environments}
          onSubmit={handleFreezeFeatureFlagsOnEnvironment}
          onClose={closeLastModal}
        />
      ),
    });

  const handleUnfreezeFeatureFlagsOnEnvironment = async (
    environment: IProjectEnvironment,
  ) => {
    if (!checkIsProjectExist(project)) {
      console.error(
        "Feature Flags can't be unfrozen because params are incorrect",
      );
      return;
    }

    const { id: environmentId, name } = environment;
    const { id: projectId } = project;

    await fetchWithToaster({
      fetch: () =>
        api.unfreezeFeatureFlags({
          environmentId,
          projectId,
        }),
      successMessage: t('freezeFeatureFlags.fetchUnfreezeSuccessMessage', {
        name,
      }),
      errorMessage: t('freezeFeatureFlags.fetchUnfreezeErrorMessage', {
        name,
      }),
    });

    await refreshProject(projectId);
  };

  const openModalWithDisableFreezeFeatureFlagsModalContent = (
    environment: IProjectEnvironment<Date>,
  ) => () =>
    addModal({
      hasCloseButton: false,
      children: (
        <DisableFreezeFeatureFlagsModalContent
          data={environment}
          onUnfreeze={handleUnfreezeFeatureFlagsOnEnvironment}
          onClose={closeLastModal}
        />
      ),
    });

  const menuItems: IMoreMenuProps['items'] = [];

  // Право 'EDIT' в project.permissions есть только у Админа
  if (project !== undefined && hasPermissions(project.permissions, 'EDIT')) {
    menuItems.push(
      {
        icon: 'download',
        item: t('export'),
        onClick: handleExport,
      },
      {
        icon: 'refresh',
        item: t('syncEnvironments'),
        onClick: () => {
          if (syncEnvironmentsInputRef.current) {
            syncEnvironmentsInputRef.current.click();
          }
        },
      },
      {
        icon: 'refresh',
        item: t('syncPortals'),
        onClick: () => {
          if (syncPortalsInputRef.current) {
            syncPortalsInputRef.current.click();
          }
        },
      },
      {
        icon: 'lock',
        item: t('freezeOrUnfreeze'),
        onClick: isSomeEnvironmentFrozen
          ? openModalWithDisableFreezeFeatureFlagsModalContent(
              frozenEnvironmentsData[0],
            )
          : openModalWithEnableFreezeFeatureFlagsForm,
      },
    );
  }

  menuItems.push({
    icon: <ProjectUniqueIcon type="swap" />,
    item: t('compareEnvironments'),
    onClick: openCompareEnvironmentsModal,
  });

  return (
    <div className={classes.root}>
      <PageHeader title={project?.name}>
        {project !== undefined && (
          <>
            <PermissionController
              permissions={project.permissions}
              allow={['EDIT_MEMBERS', 'READ_MEMBERS']}
            >
              <Link
                to={routes.projectUsersPage.getUrl({
                  projectId: project.id,
                })}
                className={classes.linkButton}
              >
                <LinkButton
                  icon="user-group"
                  size="small"
                  view="cancel"
                  hasCircleUnderIcon
                  tweakStyles={membersButtonTweakStyles}
                  text={`${project.membersCount ?? 0} ${t('projectMember', {
                    count: project.membersCount ?? 0,
                  }).toLowerCase()}`}
                />
              </Link>
            </PermissionController>
          </>
        )}
      </PageHeader>
      <EnvironmentsCompareModal
        isOpen={isEnvironmentsCompareModalOpen}
        onClose={closeCompareEnvironmentsModal}
        onSubmit={finishCompareEnvironments}
        projectId={project?.id}
      />
      {isLoading || project === undefined ? (
        <div className={classes.preloader}>
          <ThemedPreloader type="logo" />
        </div>
      ) : (
        <>
          {isSomeEnvironmentFrozen && (
            <FreezeNotification
              environmentName={frozenEnvironmentsData[0].name}
              freezingEndTime={frozenEnvironmentsData[0].freezingEndTime}
              freezingUser={frozenEnvironmentsData[0].freezingUser}
            />
          )}
          <div className={classes.content}>
            <>
              <Title
                title="Feature Flags"
                subTitle={flags.length}
                right={
                  <div className={classes.titleControls}>
                    <div className={classes.groupSwitch}>
                      <Switch
                        label={t('groupByFeatures')}
                        labelPosition="left"
                        isChecked={isGroupView}
                        value="isFlagsGrouped"
                        onChange={({ isEnabled }) => setIsGroupView(isEnabled)}
                      />
                    </div>

                    <PermissionController
                      permissions={project.permissions}
                      allow="CREATE_FLAG"
                    >
                      <div className={classes.addFlagButton}>
                        <Button
                          onClick={() => openModalWithEditFlagForm()}
                          icon="plus"
                        >
                          {t('createFlag')}
                        </Button>
                      </div>
                    </PermissionController>

                    <PermissionController
                      permissions={project.permissions}
                      allow="EDIT"
                    >
                      <input
                        type="file"
                        ref={syncEnvironmentsInputRef}
                        className={classes.hidden}
                        onChange={handleSyncEnvironments}
                        accept={FLAGS_FILE_EXTENSIONS}
                      />
                      <input
                        type="file"
                        ref={syncPortalsInputRef}
                        className={classes.hidden}
                        onChange={handleSyncPortals}
                        accept={FLAGS_FILE_EXTENSIONS}
                      />
                    </PermissionController>
                    <MoreMenu
                      items={menuItems}
                      tweakStyles={moreMenuTweakStyles}
                    />
                  </div>
                }
              />
              <div className={classes.history}>
                <Button
                  onClick={openModalWithHistoryOfChanges}
                  tweakStyles={historyOfChangesButtonTweakStyles}
                  view="text"
                >
                  <div className={classes.historyIcon}>
                    <ProjectUniqueIcon type="history" />
                  </div>
                  {t('historyOfChanges')}
                </Button>
              </div>
              {flags.length === 0 ? (
                <>
                  <Divider />
                  <EmptyContentMessage text={t('noFeatureFlags')} />
                </>
              ) : (
                <FlagsTable
                  items={flags}
                  isGroupView={isGroupView}
                  tableItemProps={{
                    isEditable: project.permissions.includes('CREATE_FLAG'),
                    editableFlagName,
                    frozenEnvironments: frozenEnvironmentsData,
                    onFlagStateChange: handleFlagStateChange,
                    onEdit: openModalWithEditFlagForm,
                    onEditFlagStrategy: openModalWithEditStrategyForm,
                  }}
                />
              )}
            </>
          </div>
        </>
      )}
      <PageFooter />
    </div>
  );
};

export default observer(FlagsPage);
