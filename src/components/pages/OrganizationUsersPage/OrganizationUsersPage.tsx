import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThemedPreloader } from '@true-engineering/true-react-common-ui-kit';
import {
  PermissionController,
  DeniedMessage,
  Title,
  LinkButton,
} from '../../atoms';
import { PageHeader, PageFooter, OrganizationUsersList } from '../../organisms';
import { useRoutes, useStore, useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './OrganizationUsersPage.styles';

const OrganizationUsersPage: FC = () => {
  const { classes } = useFeatureTogglesTheme(
    'OrganizationUsersPage',
    styles,
    {},
  );
  const { t } = useTranslation();

  const { params, routes } = useRoutes<'organizationUsersPage'>();
  const { isInitializing, findOrganizationById } = useStore();

  const rawOrganizationId =
    params.organizationId === undefined
      ? undefined
      : parseInt(params.organizationId, 10);

  const organization = findOrganizationById(rawOrganizationId);

  return (
    <div className={classes.root}>
      <PageHeader />

      {isInitializing ? (
        <div className={classes.preloader}>
          <ThemedPreloader type="logo" />
        </div>
      ) : organization === undefined ? (
        // TODO заменить на компонент
        <div>{t('pageNotFound')}</div>
      ) : (
        <PermissionController
          permissions={organization.permissions}
          allow={['READ_MEMBERS', 'EDIT_MEMBERS']}
          noPermissionMessage={<DeniedMessage />}
        >
          <div className={classes.content}>
            <Link
              to={routes.projectsPage.getUrl()}
              className={classes.linkButton}
            >
              <LinkButton
                icon="chevron-left"
                size="small"
                view="cancel"
                text={t('projectList')}
              />
            </Link>
            <div className={classes.title}>
              <Title
                title={t('organizationMembers')}
                subTitle={organization.membersCount ?? 0}
              />
            </div>
            <OrganizationUsersList
              organizationId={organization.id}
              isEditable={organization.permissions.includes('EDIT_MEMBERS')}
              projects={organization.projects}
            />
          </div>
        </PermissionController>
      )}
      <PageFooter />
    </div>
  );
};

export default OrganizationUsersPage;
