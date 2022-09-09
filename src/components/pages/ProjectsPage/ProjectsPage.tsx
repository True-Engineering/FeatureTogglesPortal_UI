import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Button,
  ThemedPreloader,
} from '@true-engineering/true-react-common-ui-kit';
import {
  Accordion,
  EmptyContentMessage,
  LinkButton,
  PermissionController,
  Title,
  Divider,
} from '../../atoms';
import {
  IEditableProjectEnvironment,
  ProjectEnvironmentsList,
  UpdateEnvironmentTokenForm,
} from '../../molecules';
import {
  EditProjectForm,
  IEditableProject,
  PageFooter,
  PageHeader,
} from '../../organisms';
import {
  useApi,
  useStore,
  useRoutes,
  useFeatureTogglesTheme,
} from '../../../hooks';
import { checkIsOrganizationExist, sortById } from '../../../utils';
import {
  IEnvironmentId,
  IProject,
  IProjectEnvironment,
  IProjectEnvironmentInstance,
  IProjectId,
} from '../../../types';
import { modalTweakStyles } from '../../commonStyles';
import { styles, membersButtonTweakStyles } from './ProjectsPage.styles';
import { ProjectAccordionContentWrapper } from './ProjectAccordionContentWrapper';
import { ProjectAccordionTitle } from './ProjectAccordionTitle';

const ProjectsPage: React.FC = () => {
  const { classes } = useFeatureTogglesTheme('ProjectsPage', styles, {});

  const { t } = useTranslation();
  const { routes } = useRoutes<'projectsPage'>();

  const api = useApi();

  const {
    currentOrganization,
    refreshOrganization,
    refreshProject,
    isInitializing,
    user,
    techStore: { fetchWithToaster, addToaster, addModal, closeLastModal },
    setDefaultProject,
  } = useStore();

  const defaultProjectId = user?.userSettings?.defaultProjectId;

  const sortedProjects =
    currentOrganization === undefined
      ? []
      : sortById(currentOrganization.projects);

  const handleCancel = () => {
    closeLastModal();
  };

  const openModalWithEditProjectForm = (projectId?: IProjectId) => {
    const editableProject =
      projectId === undefined
        ? undefined
        : currentOrganization?.projects.find(
            project => project.id === projectId,
          );

    const isNewProject = editableProject === undefined;

    addModal({
      tweakStyles: modalTweakStyles,
      size: 's',
      hasCloseButton: false,
      children: (
        <EditProjectForm
          initialValues={editableProject}
          isNewProject={isNewProject}
          onCancel={handleCancel}
          onDelete={
            editableProject !== undefined &&
            editableProject.permissions.includes('DELETE')
              ? () => onDeleteProject(editableProject)
              : undefined
          }
          onSubmit={
            editableProject === undefined
              ? values => onCreateProject(values)
              : values => onEditProject({ id: editableProject.id, ...values })
          }
        />
      ),
    });
  };

  const onEditProject = async (
    project: IEditableProject & { id: IProjectId },
  ) => {
    if (!checkIsOrganizationExist(currentOrganization)) {
      return;
    }

    await fetchWithToaster({
      fetch: () =>
        api.editProject({
          organizationId: currentOrganization.id,
          project: {
            id: project.id,
            name: project.name,
          },
        }),
      // Проверить все ли коды ошибок есть в переводах
      successMessage: t('successChangedProject'),
      errorMessage: t('failedToChangeProject'),
    });

    handleCancel();
    refreshProject(project.id);
  };

  const onMarkDefaultProject = async (project: IProject) => {
    if (!checkIsOrganizationExist(currentOrganization)) {
      return;
    }

    await fetchWithToaster({
      fetch: async () => {
        await api.markDefaultProject({
          organizationId: currentOrganization.id,
          project: {
            id: project.id,
            defaultProject: true,
          },
        });

        setDefaultProject(project.id);
      },
      successMessage: t('successChangedDefaultProject'),
      errorMessage: t('failedToChangeDefaultProject'),
    });
  };

  const onCreateProject = async (project: IEditableProject) => {
    if (!checkIsOrganizationExist(currentOrganization)) {
      return;
    }

    await fetchWithToaster({
      fetch: () =>
        api.createProject({
          organizationId: currentOrganization.id,
          project: {
            name: project.name,
          },
        }),
      successMessage: t('successCreatedProject'),
      errorMessage: t('failedToCreateProject'),
    });

    handleCancel();
    await refreshOrganization();
  };

  const onDeleteProject = async (project: IProject) => {
    if (!checkIsOrganizationExist(currentOrganization)) {
      return;
    }

    await fetchWithToaster({
      fetch: () =>
        api.deleteProject({
          organizationId: currentOrganization.id,
          projectId: project.id,
        }),
      successMessage: t('successDeletedProject'),
      errorMessage: t('failedToDeleteProject'),
    });

    handleCancel();
    await refreshOrganization();
  };

  const onEditProjectEnvironment = async ({
    projectId,
    environment,
  }: {
    projectId: IProjectId;
    environment: IEditableProjectEnvironment & { id: IEnvironmentId };
  }) => {
    await fetchWithToaster({
      fetch: () =>
        api.editEnvironment({
          projectId,
          environment,
        }),
      successMessage: t('successChangedEnvironment'),
      errorMessage: t('failedChangeEnvironment'),
    });

    await refreshProject(projectId);
  };

  const onCreateProjectEnvironment = async ({
    projectId,
    environment,
  }: {
    projectId: IProjectId;
    environment: IEditableProjectEnvironment;
  }) => {
    await fetchWithToaster({
      fetch: () =>
        api.createEnvironment({
          projectId,
          environment,
        }),
      successMessage: t('successCreatedEnvironment'),
      errorMessage: t('failedToCreateEnvironment'),
    });

    await refreshProject(projectId);
  };

  const onDeleteProjectEnvironment = async ({
    projectId,
    environment,
  }: {
    projectId: IProjectId;
    environment: IProjectEnvironment;
  }) => {
    await fetchWithToaster({
      fetch: () =>
        api.deleteEnvironment({
          projectId,
          environmentId: environment.id,
        }),
      successMessage: t('successDeletedEnvironment'),
      errorMessage: t('failedToDeleteEnvironment'),
    });

    await refreshProject(projectId);
  };

  const onUpdateToken = async ({
    projectId,
    environment,
  }: {
    projectId: IProjectId;
    environment: IProjectEnvironment;
  }) => {
    try {
      const token = await api.updateEnvironmentToken({
        projectId,
        environmentId: environment.id,
      });
      await refreshProject(projectId);

      addModal({
        tweakStyles: modalTweakStyles,
        size: 's',
        hasCloseButton: false,
        children: (
          <UpdateEnvironmentTokenForm
            initialValues={{ token }}
            onSubmit={() => {
              closeLastModal();
            }}
          />
        ),
      });
    } catch (e) {
      const errorMessage = t('failedToUpdateToken');
      addToaster({
        type: 'error',
        text: errorMessage,
        errorResponse: e.response?.data,
      });
    }
  };

  const onDeleteEnvironmentInstance = async ({
    projectId,
    instance,
  }: {
    projectId: IProjectId;
    instance: IProjectEnvironmentInstance;
  }) => {
    await fetchWithToaster({
      fetch: () =>
        api.deleteEnvironmentInstance({
          projectId,
          instanceId: instance.id,
        }),

      successMessage: t('successDeletedEnvironmentInstance'),
      errorMessage: t('failedToDeleteEnvironmentInstance'),
    });

    await refreshProject(projectId);
  };

  return (
    <div className={classes.root}>
      <PageHeader hasMainLink={false}>
        {currentOrganization !== undefined && (
          <PermissionController
            permissions={currentOrganization.permissions}
            allow={['EDIT_MEMBERS', 'READ_MEMBERS']}
          >
            <Link
              to={routes.organizationUsersPage.getUrl({
                organizationId: currentOrganization.id,
              })}
              className={classes.linkButton}
            >
              <LinkButton
                icon="user-group"
                size="small"
                view="cancel"
                hasCircleUnderIcon
                tweakStyles={membersButtonTweakStyles}
                text={`${currentOrganization.membersCount ?? 0} ${t(
                  'organizationMember',
                  {
                    count: currentOrganization.membersCount ?? 0,
                  },
                ).toLowerCase()}`}
              />
            </Link>
          </PermissionController>
        )}
      </PageHeader>

      {isInitializing ? (
        <div className={classes.preloader}>
          <ThemedPreloader type="logo" />
        </div>
      ) : (
        <div className={classes.content}>
          {currentOrganization === undefined ? (
            <EmptyContentMessage text={t('noOrganizations')} />
          ) : (
            <>
              <div className={classes.title}>
                <Title
                  title={t('allProjects')}
                  subTitle={
                    sortedProjects.length > 5
                      ? sortedProjects.length
                      : undefined
                  }
                  right={
                    <PermissionController
                      allow="CREATE_PROJECT"
                      permissions={currentOrganization.permissions}
                    >
                      <Button
                        onClick={() => openModalWithEditProjectForm()}
                        icon="plus"
                      >
                        {t('createProject')}
                      </Button>
                    </PermissionController>
                  }
                />
              </div>
              {sortedProjects.length === 0 ? (
                <>
                  <Divider />
                  <EmptyContentMessage text={t('noProjects')} />
                </>
              ) : (
                <Accordion
                  items={sortedProjects.map(project => ({
                    key: project.id,
                    title: (
                      <ProjectAccordionTitle
                        project={project}
                        hasEditButton={project.permissions.includes('EDIT')}
                        isDefaultProject={defaultProjectId === project.id}
                        flagsLink={routes.projectPage.getUrl({
                          projectId: project.id,
                        })}
                        membersLink={routes.projectUsersPage.getUrl({
                          projectId: project.id,
                        })}
                        onEditClick={() =>
                          openModalWithEditProjectForm(project.id)
                        }
                        onDefaultProjectClick={() =>
                          onMarkDefaultProject(project)
                        }
                      />
                    ),
                    content: (
                      <div className={classes.accordionContent}>
                        <ProjectAccordionContentWrapper projectId={project.id}>
                          <ProjectEnvironmentsList
                            project={project}
                            onEditProjectEnvironment={onEditProjectEnvironment}
                            onCreateProjectEnvironment={
                              project.permissions.includes('CREATE_ENV')
                                ? onCreateProjectEnvironment
                                : undefined
                            }
                            onDeleteProjectEnvironment={
                              onDeleteProjectEnvironment
                            }
                            onUpdateToken={onUpdateToken}
                            onDeleteEnvironmentInstance={
                              onDeleteEnvironmentInstance
                            }
                            onUpdateList={refreshOrganization}
                          />
                        </ProjectAccordionContentWrapper>
                      </div>
                    ),
                  }))}
                />
              )}
            </>
          )}
        </div>
      )}
      <PageFooter />
    </div>
  );
};

export default observer(ProjectsPage);
