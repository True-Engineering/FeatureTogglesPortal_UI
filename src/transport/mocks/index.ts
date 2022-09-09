import {
  IFetchCreateProjectResponseRaw,
  IFetchEditProjectResponseRaw,
  IFetchGetProjectResponseRaw,
  IFetchGetUserResponseRaw,
  IFetchLoadFlagsResponseRaw,
  IFetchLoadOrganizationsResponseRaw,
  IFetchLoadProjectsResponseRaw,
  IFetchLoadEnvironmentsResponseRaw,
  IFetchCreateEnvironmentResponseRaw,
  IFetchGetEnvironmentResponseRaw,
  IFetchEditEnvironmentResponseRaw,
  IFetchUpdateEnvironmentTokenResponseRaw,
  IFetchInviteLinkForProjectResponseRaw,
  IFetchGetOrganizationMembersResponseRaw,
  IFetchGetProjectMembersResponseRaw,
  IFetchCreateFlagResponseRaw,
  IFetchEditFlagResponseRaw,
  IFetchSyncPortalsInfoResponseRaw,
  IFetchSyncEnvironmentsInfoResponseRaw,
  IFetchSyncPortalsUploadResponseRaw,
  IFetchGetCompareEnvironmentsStateResponseRaw,
  IFetchFreezeFeatureFlagsResponseRaw,
  IFetchUnfreezeFeatureFlagsResponseRaw,
} from '../mappers';
import fetchEditMemberEnvironmentPermission from './fetch-edit-member-environment-permission';
import fetchEditMemberProjectPermission from './fetch-edit-member-project-permission';
import fetchGetFeatureFlagsForFilters from './fetch-get-feature-flags-for-filters';
import fetchGetHistoryOfChanges from './fetch-get-history-of-changes';
import fetchGetTagsForFilters from './fetch-get-tags-for-filters';
import fetchGetUsersForFilters from './fetch-get-users-for-filters';
import {
  flags,
  user,
  project,
  projectEnvironment,
  organizations,
  environmentToken,
  inviteUuid,
  projectMembers,
  organizationMembers,
  syncPortalsInfo,
  syncEnvironmentsInfo,
  compareEnvironmentsState,
} from './fixtures';
import { mockTemplate } from './mock-template';

const mocks = {
  getUser: mockTemplate<IFetchGetUserResponseRaw>('getUser', user),
  // FLAGS
  createFlag: mockTemplate<IFetchCreateFlagResponseRaw>('createFlag', flags[0]),
  editFlag: mockTemplate<IFetchCreateFlagResponseRaw>('editFlag', flags[0]),
  editFlagStrategy: mockTemplate<IFetchEditFlagResponseRaw>(
    'editFlagStrategy',
    flags[0],
  ),
  loadFlags: mockTemplate<IFetchLoadFlagsResponseRaw>('loadFlags', flags),
  enableFlag: mockTemplate<boolean>('enableFlag', true),
  disableFlag: mockTemplate<boolean>('disableFlag', true),
  deleteFlag: mockTemplate<boolean>('deleteFlag', true),
  downloadFlagsFile: mockTemplate<unknown>('downloadFlagsFile', flags),
  uploadFlagsFile: mockTemplate<boolean>('uploadFlagsFile', true),

  syncPortalsInfo: mockTemplate<IFetchSyncPortalsInfoResponseRaw>(
    'syncPortalsInfo',
    syncPortalsInfo,
  ),
  syncPortalsUpload: mockTemplate<IFetchSyncPortalsUploadResponseRaw>(
    'syncPortalsUpload',
    flags,
  ),
  syncEnvironmentsInfo: mockTemplate<IFetchSyncEnvironmentsInfoResponseRaw>(
    'syncEnvironmentsInfo',
    syncEnvironmentsInfo,
  ),
  syncEnvironmentsUpload: mockTemplate<IFetchSyncPortalsUploadResponseRaw>(
    'syncEnvironmentsUpload',
    flags,
  ),

  // ORGANIZATION
  loadOrganizations: mockTemplate<IFetchLoadOrganizationsResponseRaw>(
    'loadOrganizations',
    organizations,
  ),

  // PROJECT
  loadProjects: mockTemplate<IFetchLoadProjectsResponseRaw>(
    'loadProjects',
    organizations[0].projects,
  ),
  createProject: mockTemplate<IFetchCreateProjectResponseRaw>(
    'createProject',
    project,
  ),
  getProject: mockTemplate<IFetchGetProjectResponseRaw>('getProject', project),
  editProject: mockTemplate<IFetchEditProjectResponseRaw>(
    'editProject',
    project,
  ),
  markDefaultProject: mockTemplate<boolean>('markDefaultProject', true),
  deleteProject: mockTemplate<boolean>('deleteProject', true),

  // MEMBERS
  getInviteLinkForProject: mockTemplate<IFetchInviteLinkForProjectResponseRaw>(
    'getInviteLinkForProject',
    inviteUuid,
  ),
  fetchInvite: mockTemplate<boolean>('fetchInvite', true),
  getOrganizationMembers: mockTemplate<IFetchGetOrganizationMembersResponseRaw>(
    'getOrganizationMembers',
    organizationMembers,
  ),
  getProjectMembers: mockTemplate<IFetchGetProjectMembersResponseRaw>(
    'getProjectMembers',
    projectMembers,
  ),
  editMemberProjectPermission: fetchEditMemberProjectPermission,
  editMemberEnvironmentPermission: fetchEditMemberEnvironmentPermission,
  activateUser: mockTemplate<boolean>('activateUser', true),
  deleteOrganizationMember: mockTemplate<boolean>(
    'deleteOrganizationMember',
    true,
  ),
  deleteProjectMember: mockTemplate<boolean>('deleteProjectMember', true),

  // ENVIRONMENT
  loadEnvironments: mockTemplate<IFetchLoadEnvironmentsResponseRaw>(
    'loadEnvironments',
    organizations[0]?.projects[0]?.environments,
  ),
  createEnvironment: mockTemplate<IFetchCreateEnvironmentResponseRaw>(
    'createEnvironment',
    projectEnvironment,
  ),
  getEnvironment: mockTemplate<IFetchGetEnvironmentResponseRaw>(
    'getEnvironment',
    projectEnvironment,
  ),
  editEnvironment: mockTemplate<IFetchEditEnvironmentResponseRaw>(
    'editEnvironment',
    projectEnvironment,
  ),
  deleteEnvironment: mockTemplate<boolean>('deleteEnvironment', true),
  updateEnvironmentToken: mockTemplate<IFetchUpdateEnvironmentTokenResponseRaw>(
    'updateEnvironmentToken',
    environmentToken,
  ),

  deleteEnvironmentInstance: mockTemplate<boolean>(
    'deleteEnvironmentInstance',
    true,
  ),

  updateEnvironmentNotifications: mockTemplate<null>(
    'updateEnvironmentNotifications',
    null,
  ),

  getCompareEnvironmentsState: mockTemplate<IFetchGetCompareEnvironmentsStateResponseRaw>(
    'getCompareEnvironmentsState',
    compareEnvironmentsState,
  ),

  updateFlagsState: mockTemplate<null>('updateFlagsState', null),

  getHistoryOfChanges: fetchGetHistoryOfChanges,

  getFeatureFlagsForFilters: fetchGetFeatureFlagsForFilters,

  getUsersForFilters: fetchGetUsersForFilters,

  getTagsForFilters: fetchGetTagsForFilters,

  freezeFeatureFlags: mockTemplate<IFetchFreezeFeatureFlagsResponseRaw>(
    'freezeFeatureFlags',
    organizations[0]?.projects[0]?.environments[0],
  ),

  unfreezeFeatureFlags: mockTemplate<IFetchUnfreezeFeatureFlagsResponseRaw>(
    'unfreezeFeatureFlags',
    organizations[0]?.projects[0]?.environments[0],
  ),
};

export default mocks;
