import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThemedPreloader } from '@true-engineering/true-react-common-ui-kit';
import { PermissionController, DeniedMessage, LinkButton } from '../../atoms';
import {
  InviteMembersToProject,
  PageFooter,
  PageHeader,
} from '../../organisms';
import { useRoutes, useStore, useFeatureTogglesTheme } from '../../../hooks';
import { sortById } from '../../../utils';
import { IProjectId } from '../../../types';
import { styles } from './ProjectUsersPage.styles';

const ProjectUsersPage: FC = () => {
  const { classes } = useFeatureTogglesTheme('ProjectUsersPage', styles, {});
  const { t } = useTranslation();

  const { params, routes } = useRoutes<'projectUsersPage'>();
  const {
    currentOrganization,
    isInitializing,
    findProjectById,
    findDefaultProject,
  } = useStore();

  const rawProjectId: IProjectId | undefined =
    params.projectId === undefined ? undefined : parseInt(params.projectId, 10);

  const sortedProjects =
    currentOrganization === undefined
      ? []
      : sortById(currentOrganization.projects);

  const project =
    findProjectById(rawProjectId) ?? findDefaultProject() ?? sortedProjects[0];

  return (
    <div className={classes.root}>
      <PageHeader title={project?.name} />

      {isInitializing ? (
        <div className={classes.preloader}>
          <ThemedPreloader type="logo" />
        </div>
      ) : currentOrganization === undefined || project === undefined ? (
        // TODO заменить на компонент
        <div>{t('pageNotFound')}</div>
      ) : (
        <PermissionController
          permissions={project.permissions}
          allow={['READ_MEMBERS', 'EDIT_MEMBERS']}
          noPermissionMessage={<DeniedMessage />}
        >
          <div className={classes.content}>
            <Link
              to={routes.projectPage.getUrl({ projectId: project.id })}
              className={classes.linkButton}
            >
              <LinkButton
                icon="chevron-left"
                size="small"
                view="cancel"
                text={t('backToProject')}
              />
            </Link>
            <InviteMembersToProject
              organization={currentOrganization}
              projectId={project.id}
              isEditable={project.permissions.includes('EDIT_MEMBERS')}
            />
          </div>
        </PermissionController>
      )}
      <PageFooter />
    </div>
  );
};

export default ProjectUsersPage;
