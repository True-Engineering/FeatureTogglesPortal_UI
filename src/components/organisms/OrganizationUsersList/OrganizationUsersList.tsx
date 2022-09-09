import React, { FC, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { useTranslation } from 'react-i18next';
import {
  FiltersPane,
  ThemedPreloader,
  useIsMounted,
} from '@true-engineering/true-react-common-ui-kit';
import {
  IMemberAccordionTitleProps,
  MemberAccordionTitle,
  AddToProjectButton,
} from './components';
import { Accordion } from '../../atoms';
import { IProjectMembersListProps, ProjectMembersList } from '../../molecules';
import { useApi, useStore, useFeatureTogglesTheme } from '../../../hooks';
import { filterMembers, getProjectNameOptions } from './helpers';
import {
  IOrganizationId,
  IOrganizationMember,
  IProject,
  IUser,
} from '../../../types';
import { IFilterValues, ISearchValues } from './types';
import {
  styles,
  filtersPaneTweakStyles,
  searchTweakStyles,
  accordionTweakStyles,
} from './OrganizationUsersList.styles';

interface IOrganizationUsersListProps {
  organizationId: IOrganizationId;
  projects: IProject[];
  isEditable?: boolean;
}

const OrganizationUsersList: FC<IOrganizationUsersListProps> = ({
  organizationId,
  projects,
  isEditable = false,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'OrganizationUsersList',
    styles,
    {},
  );
  const { t, i18n } = useTranslation();

  const [members, setMembers] = useState<IOrganizationMember[]>([]);
  const api = useApi();
  const isMounted = useIsMounted();
  const {
    techStore: { fetchWithToaster },
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const projectOptions = useMemo(() => getProjectNameOptions(members), [
    members,
  ]);

  useEffect(() => {
    async function init() {
      const response = await api.getOrganizationMembers({ organizationId });
      if (isMounted()) {
        unstable_batchedUpdates(() => {
          setMembers(response);
          setIsLoading(false);
        });
      }
    }

    init();
  }, []);

  const onChangeEnvironmentPermission: IProjectMembersListProps['onChangeEnvironmentPermission'] = async ({
    user,
    projectId,
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
          prevValues.map(member =>
            member.user.id === userId
              ? {
                  ...member,
                  projects: member.projects.map(pr =>
                    pr.projectId === projectId ? { ...pr, ...response } : pr,
                  ),
                }
              : member,
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
    projectId,
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

        // eslint-disable-next-line no-unused-vars
        const { user: responseUser, ...projectRolesInfo } = response;
        setMembers(prevValues =>
          prevValues.map(member => {
            if (member.user.id !== userId) {
              return member;
            }

            const isNewProject = !member.projects.find(
              pr => pr.projectId === projectId,
            );

            const memberProjects = isNewProject
              ? [...member.projects, projectRolesInfo].sort(
                  (a, b) => a.projectId - b.projectId,
                )
              : member.projects.map(pr =>
                  pr.projectId === projectId
                    ? { ...pr, ...projectRolesInfo }
                    : pr,
                );

            return {
              ...member,
              projects: memberProjects,
            };
          }),
        );
      },
      successMessage: t('successChangedMemberRoleForProject'),
      errorMessage: t('failedToChangeMemberRoleForProject'),
    });
  };

  const onDeleteUserFromOrganization: IMemberAccordionTitleProps['onDeleteUser'] = async (
    user: IUser,
  ) => {
    const { id: userId } = user;

    await fetchWithToaster({
      fetch: async () => {
        await api.deleteOrganizationMember({ organizationId, userId });
        setMembers(prevValues =>
          prevValues.filter(member => member.user.id !== userId),
        );
      },
      successMessage: t('successDeletedOrganizationMember'),
      errorMessage: t('failedToDeleteOrganizationMember'),
    });
  };

  const onDeleteUserFromProject: IProjectMembersListProps['onDeleteUserFromProject'] = async ({
    user,
    projectId,
  }) => {
    const { id: userId } = user;

    await fetchWithToaster({
      fetch: async () => {
        await api.deleteProjectMember({ organizationId, projectId, userId });
        setMembers(prevValues =>
          prevValues.map(member =>
            member.user.id === userId
              ? {
                  ...member,
                  projects: member.projects.filter(
                    p => p.projectId !== projectId,
                  ),
                }
              : member,
          ),
        );
      },
      successMessage: t('successDeletedProjectMember'),
      errorMessage: t('failedToDeleteProjectMember'),
    });
  };

  const [filterValues, setFilterValues] = useState<IFilterValues | undefined>();
  const [searchValue, setSearchValue] = useState<ISearchValues | undefined>();

  const filteredMembers = filterMembers({
    members,
    searchValue,
    filterValues,
  });

  return (
    <div className={classes.root}>
      {isLoading ? (
        <div className={classes.preloader}>
          <ThemedPreloader type="logo" />
        </div>
      ) : (
        <>
          <div className={classes.filtersPane}>
            <FiltersPane
              testId="filterspane"
              localeKey={i18n.language.startsWith('ru') ? 'ru' : 'en'}
              search={{
                field: searchValue?.field,
                value: searchValue?.value,
                onChange: setSearchValue,
                isAutoSizeable: false,
                getValueView: t,
                tweakStyles: searchTweakStyles,
              }}
              tweakStyles={filtersPaneTweakStyles}
              filtersConfig={{
                projectName: {
                  name: t('project'),
                  type: 'select',
                  options: projectOptions,
                },
              }}
              values={filterValues}
              onChangeFilters={setFilterValues}
            />
          </div>

          {members.length === 0 ? (
            <div className={classes.empty}>{t('noMembers')}</div>
          ) : filteredMembers.length === 0 ? (
            <div className={classes.empty}>{t('membersSearchEmpty')}</div>
          ) : (
            <Accordion
              tweakStyles={accordionTweakStyles}
              items={filteredMembers.map(member => ({
                key: member.user.id,
                title: (
                  <MemberAccordionTitle
                    member={member}
                    onDeleteUser={
                      isEditable ? onDeleteUserFromOrganization : undefined
                    }
                  />
                ),
                content: (
                  <div className={classes.accordionContent}>
                    {isEditable && (
                      <div className={classes.addToProjectButton}>
                        <AddToProjectButton
                          projects={projects}
                          memberProjects={member.projects}
                          onAddToProject={project =>
                            onChangeProjectPermission({
                              user: member.user,
                              projectId: project.id,
                              projectRole: 'MEMBER',
                            })
                          }
                        />
                      </div>
                    )}
                    {member.projects.length === 0 ? (
                      <div className={classes.empty}>{t('noProjects')}</div>
                    ) : (
                      member.projects.map(
                        ({
                          projectId,
                          projectName,
                          projectRole,
                          environmentPermissions,
                        }) => (
                          <div
                            key={projectId}
                            className={classes.projectPermission}
                          >
                            <div className={classes.projectName}>
                              {projectName}
                            </div>
                            <div className={classes.projectPermissionList}>
                              <ProjectMembersList
                                isEditable={isEditable}
                                hasNameColumn={false}
                                users={[
                                  {
                                    user: member.user,
                                    projectRole,
                                    projectId,
                                    projectName,
                                    environmentPermissions,
                                  },
                                ]}
                                onChangeEnvironmentPermission={
                                  onChangeEnvironmentPermission
                                }
                                onChangeProjectPermission={
                                  onChangeProjectPermission
                                }
                                onDeleteUserFromProject={
                                  onDeleteUserFromProject
                                }
                              />
                            </div>
                          </div>
                        ),
                      )
                    )}
                  </div>
                ),
              }))}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OrganizationUsersList;
