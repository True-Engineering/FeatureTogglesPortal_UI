import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ThemedPreloader,
  useIsMounted,
} from '@true-engineering/true-react-common-ui-kit';
import { PermissionController, Tabs, Title } from '../../atoms';
import {
  AddMemberToProjectButton,
  InviteButton,
  IProjectMembersListProps,
  IProjectPendingMembersListProps,
  ProjectMembersList,
  ProjectPendingMembersList,
} from '../../molecules';
import { useApi, useStore, useFeatureTogglesTheme } from '../../../hooks';
import { IOrganization, IProjectId, IProjectMember } from '../../../types';
import { styles } from './InviteMembersToProject.styles';

export interface IInviteMembersToProjectProps {
  organization: IOrganization;
  projectId: IProjectId;
  isEditable: boolean;
}

const InviteMembersToProject: FC<IInviteMembersToProjectProps> = ({
  organization,
  projectId,
  isEditable,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'InviteMembersToProject',
    styles,
    {},
  );
  const { t } = useTranslation();
  const api = useApi();
  const isMounted = useIsMounted();
  const {
    techStore: { fetchWithToaster },
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<IProjectMember[]>([]);

  const organizationId = organization.id;

  useEffect(() => {
    async function init() {
      try {
        const response = await api.getProjectMembers({
          organizationId,
          projectId,
        });
        if (isMounted()) {
          setMembers(response);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted()) {
          setIsLoading(false);
        }
      }
    }

    init();
  }, []);

  const refreshMembers = async () => {
    const responseMembers = await api.getProjectMembers({
      organizationId,
      projectId,
    });

    if (isMounted()) {
      setMembers(responseMembers);
    }
  };

  const onChangeEnvironmentPermission: IProjectMembersListProps['onChangeEnvironmentPermission'] = async ({
    user,
    environmentId,
    environmentRole,
  }) => {
    const { id: userId } = user;

    await fetchWithToaster({
      fetch: async () => {
        const response = await api.editMemberEnvironmentPermission({
          organizationId,
          projectId,
          userId,
          environmentId,
          environmentRole,
        });
        setMembers(prevValues =>
          prevValues.map(item =>
            item.user.id === response.user.id ? response : item,
          ),
        );
      },
      successMessage: t('successChangedMemberRoleForEnvironment'),
      errorMessage: t('failedToChangeMemberRoleForEnvironment'),
    });
  };

  const onChangeProjectPermission: IProjectMembersListProps['onChangeProjectPermission'] = async ({
    user,
    projectRole,
  }) => {
    const { id: userId } = user;

    await fetchWithToaster({
      fetch: async () => {
        const response = await api.editMemberProjectPermission({
          organizationId,
          projectId,
          userId,
          role: projectRole,
        });
        setMembers(prevValues =>
          prevValues.map(item =>
            item.user.id === response.user.id ? response : item,
          ),
        );
      },
      successMessage: t('successChangedMemberRoleForProject'),
      errorMessage: t('failedToChangeMemberRoleForProject'),
    });
  };

  const onDeleteUserFromProject: IProjectMembersListProps['onDeleteUserFromProject'] = async ({
    user,
  }) => {
    const { id: userId } = user;

    await fetchWithToaster({
      fetch: async () => {
        await api.deleteProjectMember({ organizationId, projectId, userId });
        setMembers(prevValues =>
          prevValues.filter(member => member.user.id !== userId),
        );
      },
      successMessage: t('successDeletedProjectMember'),
      errorMessage: t('failedToDeleteProjectMember'),
    });
  };

  const onAcceptUser: IProjectPendingMembersListProps['onAcceptUser'] = async ({
    user,
  }) => {
    const { id: userId } = user;

    await fetchWithToaster({
      fetch: async () => {
        await api.activateUser({ projectId, userId });
        await refreshMembers();
      },

      successMessage: t('successActivateUser'),
      errorMessage: t('failedToActivateUser'),
    });
  };

  const onGetInviteLink = () =>
    api.getInviteLinkForProject({
      organizationId,
      projectId,
    });

  const onGetOrganizationMembers = () =>
    api.getOrganizationMembers({
      organizationId,
    });

  const activeMembers = members.filter(({ user }) => user.status === 'ACTIVE');
  const pendingMembers = members.filter(
    ({ user }) => user.status === 'PENDING',
  );

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Title
          title={t('projectMembers')}
          right={
            <div className={classes.titleControls}>
              <PermissionController
                permissions={organization.permissions}
                allow={['READ_MEMBERS', 'EDIT_MEMBERS']}
              >
                <AddMemberToProjectButton
                  onAddToProject={user =>
                    onChangeProjectPermission({
                      user,
                      projectId,
                      projectRole: 'MEMBER',
                    })
                  }
                  onGetMembers={onGetOrganizationMembers}
                />
              </PermissionController>
              <InviteButton onGetInviteLink={onGetInviteLink} />
            </div>
          }
        />
      </div>
      {isLoading ? (
        <div className={classes.preloader}>
          <ThemedPreloader type="logo" />
        </div>
      ) : isEditable ? (
        <Tabs
          tabs={[
            {
              key: 0,
              text: t('projectMembers'),
              count: activeMembers.length,
              content: (
                <div className={classes.tab}>
                  <ProjectMembersList
                    users={activeMembers}
                    isEditable={isEditable}
                    onChangeEnvironmentPermission={
                      onChangeEnvironmentPermission
                    }
                    onChangeProjectPermission={onChangeProjectPermission}
                    onDeleteUserFromProject={onDeleteUserFromProject}
                  />
                </div>
              ),
            },
            {
              key: 1,
              text: t('pendingMembers'),
              count: pendingMembers.length,
              content: (
                <div className={classes.tab}>
                  <ProjectPendingMembersList
                    users={pendingMembers}
                    onAcceptUser={onAcceptUser}
                    onRejectUser={onDeleteUserFromProject}
                  />
                </div>
              ),
            },
          ]}
        />
      ) : (
        <div className={classes.tab}>
          <ProjectMembersList
            users={activeMembers}
            isEditable={isEditable}
            onChangeEnvironmentPermission={onChangeEnvironmentPermission}
            onChangeProjectPermission={onChangeProjectPermission}
            onDeleteUserFromProject={onDeleteUserFromProject}
          />
        </div>
      )}
    </div>
  );
};

export default InviteMembersToProject;
